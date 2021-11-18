import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation } from "@apollo/client";
import {
  OBTENER_INVENTARIO,
  REGISTRAR_INVENTARIO,
} from "../../CRUD/inventario";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  faPlus,
  faSave,
  faTimes,
  faEllipsisV,
  faHashtag,
  faPen,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu";
import Header from "../Header";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import swal from "sweetalert";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import storage from "../../firebase";

const Inventario = () => {
  const {
    state: { authenticated },
  } = useGlobalState();

  const initialState = {
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
    categoria: "",
    imagen: "",
    whatsapp: "",
    correo: "",
    estado: "A",
  };

  interface Inventario {
    id: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria: string;
    imagen: string;
    whatsapp: string;
    correo: string;
    estado: string;
  }

  const [inventario, setInventario] = useState<Inventario[]>([]);
  const [inventarioActual, setInventarioActual] = useState<Inventario>({
    ...initialState,
    id: "",
  });
  const [files, setFiles] = useState<any>();
  const [search, setSearch] = useState("");

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const [registrarInventario] = useMutation(REGISTRAR_INVENTARIO, {
    onCompleted: ({ registrado: { id } }) => {
      if (id) {
        setInventario((prev) => [...prev, { ...inventarioActual, id }]);
        swal({
          title: "¡Registrado!",
          text: "Producto registrado exitosamente.",
          icon: "success",
          timer: 5000,
        });
      } else
        swal({
          title: "Error!",
          text: "No se pudo insertar. Por favor inténtelo nuevamente.",
          icon: "error",
          timer: 5000,
        });
    },
    onError: ({ message }) => {
      swal({
        title: "¡Error!",
        text: message,
        icon: "error",
        timer: 5000,
      });
    },
  });

  const handleSubmit = (values, categoria) => {
    console.log("cat", categoria);
    setInventarioActual({ ...values, categoria });
    console.log(inventarioActual, values);
    if (files && files[0]) {
      handleUpload(files[0]);
    } else {
      registrarInventario({
        variables: { inventario: { ...inventarioActual, categoria } },
      });
    }
  };

  const filterInventario = (): Inventario[] => {
    if (search.length === 0) return inventario;

    const filter = inventario.filter((producto) =>
      producto.nombre.includes(search)
    );
    return filter;
  };

  const { called, loading, error } = useQuery(OBTENER_INVENTARIO, {
    onCompleted: ({ inventario }) => {
      setInventario(inventario);
    },
  });

  useEffect(() => {
    (function () {
      var forms = document.querySelectorAll(".needs-validation");

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  });

  if (called && loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Error :(</p>;

  const handleUpload = (file) => {
    var uploadTask = storage
      .ref()
      .child("inventario/" + file?.name)
      .put(file);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        swal({
          title: "Error!",
          text: "Ocurrió un error al subir la imagen. Por favor inténtelo nuevamente.",
          icon: "error",
          timer: 5000,
        });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          registrarInventario({
            variables: {
              inventario: { ...inventarioActual, imagen: downloadURL },
            },
          });
        });
      }
    );
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className=" wrapper d-flex" id="wrap">
        <Menu></Menu>
        <div className="page-content-wrapper">
          <Header></Header>
          <div className="container-fluid mt-4 px-3">
            <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
              <div className="row mx-auto">
                <div className="col-md-8">
                  <h1 className="fw-bold">Lista de Productos y Servicios</h1>
                  <p className="text-muted">
                    Lista de productos y servicios en el sistema
                  </p>
                </div>
                <div className="col-md-2">
                  <div className="d-flex flex-column">
                    <h1 className="text-primary fw-bold display-5">
                      {inventario?.length}
                    </h1>
                    <small className="text-muted">
                      {inventario?.length > 1 ? "Datos" : "Dato"}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
              <nav>
                <div
                  className="nav nav-tabs bg-light"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-productos-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-productos"
                    type="button"
                    role="tab"
                    aria-controls="nav-productos"
                    aria-selected="true"
                  >
                    Productos
                  </button>
                  <button
                    className="nav-link"
                    id="nav-servicios-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-servicios"
                    type="button"
                    role="tab"
                    aria-controls="nav-servicios"
                    aria-selected="false"
                  >
                    Servicios
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-productos"
                  role="tabpanel"
                  aria-labelledby="nav-productos-tab"
                >
                  <div className="row mx-auto mt-4">
                    <div className="col-md-9">
                      <div className="mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar..."
                          value={search}
                          onChange={onSearchChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#addProducto"
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Agregar Producto
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="tableHolder mt-4">
                    <table
                      className="table table-hover table-borderless table-striped"
                      id="table"
                    >
                      <thead className="table-primary-custom">
                        <tr>
                          <th>
                            <FontAwesomeIcon icon={faHashtag} />
                          </th>
                          <th>
                            <FontAwesomeIcon icon={faBarcode} /> Código
                          </th>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                          <th>Estado</th>
                          <th>Precio</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterInventario()
                          .filter((item) => item.categoria === "P")
                          .map((item) => (
                            <tr key={item.id}>
                              <td className="align-middle fw-bold text-muted">
                                {item.id}
                              </td>
                              <td className="align-middle text-primary">
                                {item.codigo}
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                <Tippy
                                  content={<span>{item.descripcion}</span>}
                                >
                                  <span>{item.nombre}</span>
                                </Tippy>
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                {item.cantidad}
                              </td>
                              <td className="align-middle">
                                <h5 className="mb-0">
                                  <span
                                    className={`badge bg-${
                                      item.estado === "A" ? "success" : "danger"
                                    }`}
                                  >
                                    {item.estado === "A"
                                      ? "Activo"
                                      : "Inactivo"}
                                  </span>
                                </h5>
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                <Tippy content={<span>Colones</span>}>
                                  <span>₡{item.precio}</span>
                                </Tippy>
                              </td>
                              <td
                                className="align-middle"
                                data-bs-id={item.id}
                                data-bs-toggle="modal"
                                data-bs-target="#edit"
                              >
                                <button
                                  type="button"
                                  className="btn btn-light btn-c"
                                  onClick={() => setInventarioActual(item)}
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-servicios"
                  role="tabpanel"
                  aria-labelledby="nav-servicios-tab"
                >
                  <div className="row mx-auto mt-4">
                    <div className="col-md-9">
                      <div className="mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar..."
                          value={search}
                          onChange={onSearchChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#addServicio"
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Agregar Servicio
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="tableHolder mt-4">
                    <table
                      className="table table-hover table-borderless table-striped"
                      id="table"
                    >
                      <thead className="table-primary-custom">
                        <tr>
                          <th>
                            <FontAwesomeIcon icon={faHashtag} />
                          </th>
                          <th>
                            <FontAwesomeIcon icon={faBarcode} /> Código
                          </th>
                          <th>Nombre</th>
                          <th>Estado</th>
                          <th>Precio</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterInventario()
                          .filter((item) => item.categoria === "S")
                          .map((item) => (
                            <tr key={item.id}>
                              <td className="align-middle fw-bold text-muted">
                                {item.id}
                              </td>
                              <td className="align-middle text-primary">
                                {item.codigo}
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                <Tippy
                                  content={<span>{item.descripcion}</span>}
                                >
                                  <span>{item.nombre}</span>
                                </Tippy>
                              </td>
                              <td className="align-middle">
                                <h5 className="mb-0">
                                  <span
                                    className={`badge bg-${
                                      item.estado === "A" ? "success" : "danger"
                                    }`}
                                  >
                                    {item.estado === "A"
                                      ? "Activo"
                                      : "Inactivo"}
                                  </span>
                                </h5>
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                <Tippy content={<span>Colones</span>}>
                                  <span>₡{item.precio}</span>
                                </Tippy>
                              </td>
                              <td
                                className="align-middle"
                                data-bs-id={item.id}
                                data-bs-toggle="modal"
                                data-bs-target="#edit"
                              >
                                <button
                                  type="button"
                                  className="btn btn-light btn-c"
                                  onClick={() => setInventarioActual(item)}
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="edit"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2 bg-primary text-white">
              <h5 className="modal-title">
                <FontAwesomeIcon icon={faPen} className="me-2" />
                <span id="addModalLabel"></span>
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4>Producto:</h4>
              <hr />
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addProducto"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2 bg-primary text-white">
              <h5 className="modal-title" id="addModalLabel">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Agregar Producto
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialState}
                onSubmit={async (values) => {
                  await handleSubmit(values, "P");
                }}
              >
                {({ isSubmitting, handleSubmit }) => (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      isSubmitting = true;
                      handleSubmit(e);
                    }}
                    className="row g-3 needs-validation"
                    id="formAgregar"
                    noValidate
                  >
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="codigoLabel"
                          className="form-label fw-bold"
                        >
                          Código
                        </label>
                        <Field
                          className="form-control"
                          id="codigoLabel"
                          name="codigo"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="codigo"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="nombreLabel"
                          className="form-label fw-bold"
                        >
                          Nombre
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="nombreLabel"
                          name="nombre"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="nombre"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="PrecioLabel"
                          className="form-label fw-bold"
                        >
                          Precio
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="PrecioLabel"
                          name="precio"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="precio"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="cantidadLabel"
                          className="form-label fw-bold"
                        >
                          Cantidad
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="cantidadLabel"
                          name="cantidad"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="cantidad"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="descripcionLabel"
                          className="form-label fw-bold"
                        >
                          Descripcion
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="descripcionLabel"
                          name="descripcion"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="descripcion"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formFile"
                          className="form-label fw-bold"
                        >
                          Imagen
                        </label>
                        <input
                          className="form-control"
                          placeholder="Selecciona un archivo"
                          type="file"
                          id="formFile"
                          accept="image/*"
                          onChange={({ target: { files } }) => setFiles(files)}
                        ></input>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="formAgregar"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addServicio"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header py-2 bg-primary text-white">
              <h5 className="modal-title" id="addModalLabel">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Agregar Servicio
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialState}
                onSubmit={async (values) => {
                  await handleSubmit(values, "S");
                }}
              >
                {({ isSubmitting, handleSubmit }) => (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      isSubmitting = true;
                      handleSubmit(e);
                    }}
                    className="row g-3 needs-validation"
                    id="formAgregar"
                    noValidate
                  >
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="codigoLabel"
                          className="form-label fw-bold"
                        >
                          Código
                        </label>
                        <Field
                          className="form-control"
                          id="codigoLabel"
                          name="codigo"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="codigo"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="descripcionLabel"
                          className="form-label fw-bold"
                        >
                          Descripcion
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="descripcionLabel"
                          name="descripcion"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="descripcion"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="correoLabel"
                          className="form-label fw-bold"
                        >
                          Correo
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="correoLabel"
                          name="correo"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="correo"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formFile"
                          className="form-label fw-bold"
                        >
                          Imagen
                        </label>
                        <input
                          className="form-control"
                          placeholder="Selecciona un archivo"
                          type="file"
                          id="formFile"
                          accept="image/*"
                          onChange={({ target: { files } }) => setFiles(files)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="nombreLabel"
                          className="form-label fw-bold"
                        >
                          Nombre
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="nombreLabel"
                          name="nombre"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="nombre"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="PrecioLabel"
                          className="form-label fw-bold"
                        >
                          Precio
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="PrecioLabel"
                          name="precio"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="precio"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="whatsappLabel"
                          className="form-label fw-bold"
                        >
                          Número de Teléfono
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="whatsappLabel"
                          name="whatsapp"
                          required
                        />
                        <ErrorMessage
                          component="div"
                          name="whatsapp"
                          className="invalid-feedback"
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="formAgregar"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
