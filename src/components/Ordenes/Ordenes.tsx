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
import { OBTENER_PEDIDOS } from "../../CRUD/pedido";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";

const Ordenes = () => {
  const initialState = {
    id: "",
    cantidad: 0,
    estado: "",
    producto: {
      id: "",
      precio: 0,
      nombre: "",
    },
  };
  interface Orden {
    id: string;
    cantidad: number;
    estado: string;
    producto: {
      id: string;
      precio: number;
      nombre: string;
    };
  }
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const {} = useQuery(OBTENER_PEDIDOS, {
    onCompleted: ({ pedidos }) => {
      setOrdenes(pedidos);
    },
  });

  const [ordenActual, setOrdenActual] = useState<Orden>({
    ...initialState,
    id: "",
  });

  const [search, setSearch] = useState("");

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filterOrden = (): Orden[] => {
    if (search.length === 0) return ordenes;

    const filter = ordenes.filter((orden) =>
      orden.producto.nombre.includes(search)
    );
    return filter;
  };

  //const { called, loading, error } = useQuery(OBTENER_SOCIOS, {
  //  onCompleted: ({ ordenes }) => {
  //    setOrdenes(ordenes);
  //  },
  //});

  //const cambiarEstadoPedido = () => {
  //  editarPedido({
  //    variables: { orden: { ...socioActual } },
  //  });
  //};

  //if (called && loading)
  //  return (
  //    <div className="spinner-border" role="status">
  //      <span className="visually-hidden">Loading...</span>
  //    </div>
  //  );

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
                  <h1 className="fw-bold">Lista de Ordenes</h1>
                  <p className="text-muted">Lista de ordenes en el sistema</p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <h1 className="text-primary fw-bold display-5">
                      {ordenes?.length}
                    </h1>
                    <small className="text-muted">Ordenes</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
              <div className="row mx-auto">
                <div className="col-md-12">
                  {/* search */}
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
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrden().map((orden) => (
                      <tr key={orden.id}>
                        <td className="align-middle fw-bold text-muted">
                          {orden.id}
                        </td>
                        <td className="align-middle fw-bold ">
                          {orden.producto.nombre}
                        </td>
                        <td className="align-middle fw-bold text-muted">
                          {orden.cantidad}
                        </td>
                        <td className="align-middle">
                          <h5 className="mb-0">
                            <span
                              className={`badge bg-${
                                orden.estado === "A" ? "success" : "danger"
                              }`}
                            >
                              {orden.estado === "A" ? "Activo" : "Inactivo"}
                            </span>
                          </h5>
                        </td>
                        <td>
                          <div>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => setOrdenActual(orden)}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => setOrdenActual(orden)}
                            >
                              Rechazar
                            </button>
                          </div>
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
              <h4>{`Orden: ${ordenActual.producto.nombre}`}</h4>
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
                  <input
                    type="checkbox"
                    id="estadoSwitch"
                    checked={ordenActual.estado === "A" ? true : false}
                    onChange={({ target: { checked } }) =>
                      setOrdenActual((prev) => ({
                        ...prev,
                        estado: checked ? "A" : "I",
                      }))
                    }
                  />
                  <span className="slider-cus round-cus"></span>
                </label>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-primary"
                //onClick={() => cambiarEstadoSocio()}
              >
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
      ></div>
    </div>
  );
};

export default Ordenes;
