import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  faPlus,
  faSave,
  faTimes,
  faEllipsisV,
  faShoppingBasket,
  faShoppingCart,
  faPen,
  faBarcode,
  faMinus,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import ClienteMenu from "../ClienteMenu";
import { useQuery } from "@apollo/client";
import { OBTENER_INVENTARIO } from "../../CRUD/inventario";

const ClienteProductos = () => {
  const {
    state: { authenticated },
  } = useGlobalState();

  var productos = [
    {
      id: 1,
      nombre: "Producto 1",
      precio: "100",
      descripcion: "Descripcion del producto 1",
      cantidad: "10",
      codigo: "12345",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: "200",
      descripcion: "Descripcion del producto 2",
      cantidad: "20",
      codigo: "54321",
    },
    {
      id: 3,
      nombre: "Producto 3",
      precio: "300",
      descripcion: "Descripcion del producto 3",
      cantidad: "30",
      codigo: "98765",
    },
    {
      id: 4,
      nombre: "Producto 4",
      precio: "400",
      cantidad: "40",
      descripcion: "Descripcion del producto 4",
      codigo: "43210",
    },
    {
      id: 5,
      nombre: "Producto 5",
      precio: "500",
      descripcion: "Descripcion del producto 5",
      cantidad: "50",
      codigo: "87654",
    },
    {
      id: 6,
      nombre: "Producto 6",
      precio: "600",
      descripcion: "Descripcion del producto 6",
      cantidad: "60",
      codigo: "87654",
    },
  ];

  const history = useHistory();

  const { called, loading, error, data } = useQuery(OBTENER_INVENTARIO, {
    onError: ({ message }) => {
      swal({
        title: "¡Error!",
        text: message,
        icon: "error",
        timer: 5000,
      });
    },
  });
  const defaultIMG =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbuCfcVJQdMBgo7P1h4b0q8E3pzwGVtB1b_7AKK7EMXnZ2adrDBrx1KKCQm28tr6bXFU&usqp=CAU";

  return (
    <>
      {!authenticated && (
        <div>
          <ClienteMenu></ClienteMenu>
          <div className="d-flex flex-column h-100">
            <div className="container-fluid">
              <ul
                className="nav nav-pills my-5 px-5"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item me-5" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-productos-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-productos"
                    type="button"
                    role="tab"
                    aria-controls="pills-productos"
                    aria-selected="true"
                  >
                    Productos
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-servicios-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-servicios"
                    type="button"
                    role="tab"
                    aria-controls="pills-servicios"
                    aria-selected="false"
                  >
                    Servicios
                  </button>
                </li>
              </ul>
              <div className="tab-content px-5" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-productos"
                  role="tabpanel"
                  aria-labelledby="pills-productos-tab"
                >
                  <h2>Productos</h2>
                  <hr />
                  <div className="row mx-auto justify-content-center">
                    {data?.inventario
                      .filter((i) => i.categoria == "P")
                      .map((producto) => (
                        <div
                          className="col-lg-3 col-md-5 mb-5 d-flex justify-content-center"
                          key={producto.id}
                        >
                          <div className="card" style={{ width: "18rem" }}>
                            <img
                              src={producto.imagen || defaultIMG}
                              className="card-img-top"
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">{producto.nombre}</h5>
                              <p className="card-text">
                                {producto.descripcion}
                              </p>
                              <p className="card-text fw-bold">
                                ₡{producto.precio}
                              </p>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start me-3">
                                  <button className="btn btn-c2 me-2">
                                    <FontAwesomeIcon icon={faMinus} />
                                  </button>
                                  <h4>{producto.cantidad > 0 ? "1" : "0"}</h4>
                                  <button className="btn btn-c2 ms-2">
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>

                                <button className="btn btn-primary">
                                  Agregar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-servicios"
                  role="tabpanel"
                  aria-labelledby="pills-servicios-tab"
                >
                  <h2>Servicios</h2>
                  <hr />
                  <div className="row mx-auto">
                    {data?.inventario
                      .filter((i) => i.categoria == "S")
                      .map((servicio) => (
                        <div className="col-lg-3" key={servicio.id}>
                          <div className="card" style={{ width: "18rem" }}>
                            <img
                              src={servicio.imagen || defaultIMG}
                              className="card-img-top"
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">{servicio.nombre}</h5>
                              <p className="card-text">
                                {servicio.descripcion}
                              </p>
                              <p className="card-text fw-bold">
                                ₡{servicio.precio}
                              </p>
                              <hr />
                              {/* show email and phone */}
                              <a
                                className="btn btn-light text-info w-100 d-block text-start"
                                href={`mailto:${servicio.correo}`}
                              >
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="me-2"
                                />{" "}
                                {servicio.correo}
                              </a>
                              <a
                                className="btn btn-light text-success w-100 d-block text-start my-2"
                                href={`tel:${servicio.whatsapp}`}
                              >
                                <FontAwesomeIcon
                                  icon={faPhone}
                                  className="me-2"
                                />{" "}
                                {servicio.whatsapp}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClienteProductos;
