import React from "react";
import Menu from "../Menu";
import { faSave, faHashtag, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/client";
import { OBTENER_INVENTARIO } from "../../CRUD/inventario";
import { useGlobalState } from "../../GlobalStateProvider";
import Header from "../Header";
import "tippy.js/dist/tippy.css"; // optional

const Ordenes = () => {
  const {
    state: { authenticated },
  } = useGlobalState();

  // var ordenes = new Map();
  
  const { called, loading, data, error } = useQuery(OBTENER_INVENTARIO, {
    onCompleted: (data) => {
      console.log(data);
      data.obtenerInventario.forEach((d) => {
        // ordenes.set(d.id, d);
      });
    },
  });

  if (called && loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Error :(</p>;

  return (
    <>
      {authenticated && (
        <div className="d-flex flex-column h-100">
          <div className=" wrapper d-flex" id="wrap">
            <Menu></Menu>
            <div className="page-content-wrapper">
              <Header></Header>
              <div className="container-fluid mt-4 px-3">
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-8">
                      <h1 className="fw-bold">Lista de Ordenes</h1>
                      <p className="text-muted">
                        Lista de ordenes generadas en el sistema
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <h1 className="text-primary fw-bold display-5">
                          {/* {data?.obtenerInventario.length} */}0
                        </h1>
                        <small className="text-muted">Productos</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-9">
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
                      <div className="d-grid gap-2"></div>
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
                          <th>Cliente</th>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Estado</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {data?.obtenerInventario.map(
                          ({
                            id,
                            codigo,
                            nombre,
                            precio,
                            cantidad,
                            imagen,
                            estado,
                            descripcion,
                          }) => (
                            <tr key={id}>
                              <td className="align-middle fw-bold text-muted">
                                {id}
                              </td>
                              <td className="align-middle text-primary">
                                {codigo}
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                <Tippy content={<span>{descripcion}</span>}>
                                  <span>{nombre}</span>
                                </Tippy>
                              </td>
                              <td className="align-middle fw-bold text-muted">
                                {cantidad}
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
                              <td className="align-middle fw-bold text-muted">
                                <Tippy content={<span>Colones</span>}>
                                  <span>₡{precio}</span>
                                </Tippy>
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
                          )
                        )} */}
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
                  <form
                    action=""
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
                          Codigo
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="codigoLabel"
                          name="codigo"
                          required
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
                        <input
                          type="text"
                          className="form-control"
                          id="nombreLabel"
                          name="nombre"
                          required
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
                        <input
                          type="text"
                          className="form-control"
                          id="descripcionLabel"
                          name="descripcion"
                          required
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
                        <input
                          type="number"
                          className="form-control"
                          id="PrecioLabel"
                          name="Precio"
                          required
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
                        <input
                          type="number"
                          className="form-control"
                          id="cantidadLabel"
                          name="cantidad"
                          required
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="imagenLabel"
                          className="form-label fw-bold"
                        >
                          Imagen
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="imagenLabel"
                          name="imagen"
                          required
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
                          Whatsapp
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="whatsappLabel"
                          name="whatsapp"
                          required
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
                        <input
                          type="email"
                          className="form-control"
                          id="correoLabel"
                          name="correo"
                          required
                        />
                        <div className="invalid-feedback">
                          Formato Incorrecto
                        </div>
                      </div>
                    </div>
                  </form>
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
        </div>
      )}
    </>
  );
};

export default Ordenes;
