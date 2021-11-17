import Menu from "../Menu";
import Header from "../Header";
import {
  faPlus,
  faSave,
  faTimes,
  faEllipsisV,
  faHashtag,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@apollo/client";
import { OBTENER_SOCIOS, REGISTRAR_SOCIO } from "../../CRUD/socio";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import swal from "sweetalert";

const Socios = () => {
  const initialState = {
    cedula: "",
    nombre: "",
    estado: "A",
  };

  interface Socio {
    id: string;
    nombre: string;
    cedula: string;
    estado: string;
  }
  const [socios, setSocios] = useState<Socio[]>([]);
  const [nuevoSocio, setNuevoSocio] = useState<Socio>({
    ...initialState,
    id: "",
  });

  const [registrarSocios] = useMutation(REGISTRAR_SOCIO, {
    onCompleted: ({ socio: { id } }) => {
      if (id) {
        setSocios((prev) => [...prev, { ...nuevoSocio, id }]);
        swal({
          title: "¡Registrado!",
          text: "Socio registrado exitosamente.",
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

  //var socios = new Map();

  const { called, loading, error } = useQuery(OBTENER_SOCIOS, {
    onCompleted: ({ socios }) => {
      setSocios(socios);
    },
  });

  const handleSubmit = (values) => {
    setNuevoSocio({ ...values, cedula: values.cedula.toString() });
    registrarSocios({
      variables: { socio: nuevoSocio },
    });
  };

  // TODO: Error handling del formulario
  // (function () {
  // 	var forms = document.querySelectorAll('.needs-validation')

  // 	Array.prototype.slice.call(forms)
  // 	  .forEach(function (form) {
  // 		form.addEventListener('submit', function (event) {
  // 		  if (!form.checkValidity()) {
  // 			event.preventDefault()
  // 			event.stopPropagation()
  // 		  }

  // 		  form.classList.add('was-validated')
  // 		}, false)
  // 	  })

  // })();
  // TODO: Cuando se abra el editar mostarar los datos en el modal
  // var edit = document.getElementById('edit');
  // edit!.addEventListener('show.bs.modal', function (event : any) {
  // 	var button = event.relatedTarget;
  // 	var id = button.getAttribute('data-bs-id')
  // 	var socio = socios.get(id);
  // 	var title = document.getElementById('addModalLabel');
  // 	title!.innerHTML = `Editar ${socio.nombre}`;

  // });

  if (called && loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Error :(</p>;
  return (
    <>
      {
        //authenticated && (

        <div className="d-flex flex-column h-100">
          <div className=" wrapper d-flex" id="wrap">
            <Menu></Menu>
            <div className="page-content-wrapper">
              <Header></Header>
              <div className="container-fluid mt-4 px-3">
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-8">
                      <h1 className="fw-bold">Lista de Socios</h1>
                      <p className="text-muted">
                        Lista de socios en el sistema
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <h1 className="text-primary fw-bold display-5">
                          {socios?.length}
                        </h1>
                        <small className="text-muted">Socios</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-9">
                      {/* search */}
                      <div className="mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar..."
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* add */}
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#add"
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Agregar Socio
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-primary rounded-15 mb-3">
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
                          <th>Cedula</th>
                          <th>Nombre</th>
                          <th>Estado</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {socios?.map(({ id, cedula, nombre, estado }) => (
                          <tr key={id}>
                            <td className="align-middle fw-bold text-muted">
                              {id}
                            </td>
                            <td className="align-middle fw-bold ">{cedula}</td>
                            <td className="align-middle fw-bold text-muted">
                              {nombre}
                            </td>
                            <td className="align-middle">
                              <h5 className="mb-0">
                                <span
                                  className={`badge bg-${
                                    estado === "A" ? "success" : "danger"
                                  }`}
                                >
                                  {estado === "A" ? "Activo" : "Inactivo"}
                                </span>
                              </h5>
                            </td>
                            <td
                              className="align-middle"
                              data-bs-id={id}
                              data-bs-toggle="modal"
                              data-bs-target="#edit"
                            >
                              <button
                                type="button"
                                className="btn btn-light btn-c"
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
          <div
            className="modal fade"
            id="edit"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
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
                  <h4>Socio:</h4>
                  {/*<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<input type="text" className="form-control" id="cedula" placeholder="Cedula" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<input type="text" className="form-control" id="nombre" placeholder="Nombre" />
											</div>
										</div>
									</div>*/}
                  <hr />
                  <div className="">
                    <small className="mb-0 me-4 d-block">Estado</small>
                    <label className="switch-cus" htmlFor="estadoSwitch">
                      <input type="checkbox" id="estadoSwitch" />
                      <span className="slider-cus round-cus"></span>
                    </label>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-primary">
                    Salvar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="add"
            aria-labelledby="addModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header py-2 bg-primary text-white">
                  <h5 className="modal-title" id="addModalLabel">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Agregar Socio
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
                      await handleSubmit(values);
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
                              htmlFor="cedula"
                              className="form-label fw-bold"
                            >
                              Cedula
                            </label>
                            <Field
                              className="form-control"
                              type="number"
                              id="cedula"
                              name="cedula"
                              aria-describedby="cedulaHelp"
                              minLength={9}
                              required
                            />
                            <ErrorMessage
                              component="div"
                              name="usuario"
                              className="invalid-feedback"
                            />
                            <div id="cedulaHelp" className="form-text">
                              Sin guiones o espacios p.ej 112345678
                            </div>
                            <div className="valid-feedback">
                              Formato Correcto
                            </div>
                            <div className="invalid-feedback">
                              Formato Incorrecto
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="nombre"
                              className="form-label fw-bold"
                            >
                              Nombre
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="nombre"
                              required
                              name="nombre"
                            />
                            <ErrorMessage
                              component="div"
                              name="usuario"
                              className="invalid-feedback"
                            />
                            <div className="valid-feedback">Correcto</div>
                            <div className="invalid-feedback">
                              Campo Incompleto
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
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        /*)*/
      }
    </>
  );
};

export default Socios;
