import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pedido, useGlobalState } from "../../GlobalStateProvider";
import {
  faPlus,
  faMinus,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import ClienteMenu from "../ClienteMenu";
import { useMutation, useQuery } from "@apollo/client";
import { OBTENER_INVENTARIO } from "../../CRUD/inventario";
import { REGISTRAR_PEDIDO } from "../../CRUD/pedido";
const defaultIMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbuCfcVJQdMBgo7P1h4b0q8E3pzwGVtB1b_7AKK7EMXnZ2adrDBrx1KKCQm28tr6bXFU&usqp=CAU";

const ClienteProductos = () => {
  const {
    state: { user },
    setState,
  } = useGlobalState();

  const [miPedido, setMiPedido] = useState<Pedido>({
    id: "",
    cantidad: 0,
    estado: "0",
    producto: { id: "", nombre: "", precio: 0 },
  });

  const { loading, data } = useQuery(OBTENER_INVENTARIO, {
    onError: ({ message }) => {
      swal({
        title: "¡Error!",
        text: message,
        icon: "error",
        timer: 5000,
      });
    },
  });
  const [registrarPedido] = useMutation(REGISTRAR_PEDIDO, {
    onCompleted: ({ pedido: { id } }) => {
      if (id) {
        //setState((prev) => ({
        //  ...prev, user: {...prev.user, nombre: 'JUANAA'}
        //}));
        swal({
          title: "¡Registrado!",
          text: "Pedido registrado exitosamente. ¡Revisa tu carrito!",
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

  const handleObtenerProducto = (producto, cantidad) => {
    setMiPedido((prev) => ({
      ...prev,
      cantidad,
      estado: "0",
      producto: {
        id: producto.id,
        precio: producto.precio,
        nombre: producto.nombre,
      },
    }));

    registrarPedido({
      variables: {
        pedido: {
          fk_usuario: user?.id,
          fk_inventario: producto.id,
          estado: "0",
          cantidad,
        },
      },
    });
  };

  return (
    <div>
      <ClienteMenu></ClienteMenu>
      {loading && (
        <div className="vw-100 vh-100">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-grow text-primary" role="status">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex flex-column h-100">
        <div className="container-fluid">
          <ul className="nav nav-pills my-5 px-5" id="pills-tab" role="tablist">
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
                          <p className="card-text">{producto.descripcion}</p>
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

                            <button
                              className="btn btn-primary"
                              onClick={() => handleObtenerProducto(producto, 2)}
                            >
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
                          <p className="card-text">{servicio.descripcion}</p>
                          <p className="card-text fw-bold">
                            ₡{servicio.precio}
                          </p>
                          <hr />
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
                            <FontAwesomeIcon icon={faPhone} className="me-2" />{" "}
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
  );
};

export default ClienteProductos;
