import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalState } from "../../GlobalStateProvider";
import {
  faShoppingBasket,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css"; // optional

const ClienteMenu = () => {
  const history = useHistory();
  const {
    state: { user },
  } = useGlobalState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    user?.pedidos.map((pedido) =>
      setTotal((prev) => prev + pedido.producto.precio * pedido.cantidad)
    );
  }, [user]);

  return (
    <div className="d-flex flex-column h-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid d-flex justify-content-between">
          <div
            className="navbar-brand"
            onClick={() => history.push("/el_ahorro")}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-primary me-3"
            />
            El Ahorro
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end me-5"
            id="navbarColor01"
          >
            <div className="d-flex justify-content-end">
              <div className="me-5">
                <input
                  className="form-control "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ width: "350px" }}
                />
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle me-5"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faShoppingBasket} /> Carrito
                </button>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenu2"
                >
                  <div
                    className="d-flex flex-column px-3 text-start p-3"
                    style={{ width: "300px" }}
                  >
                    <h3>Tu pedido</h3>
                    <hr />
                    {user?.pedidos.map((pedido) => (
                      <div key={pedido.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex justify-content-start align-items-center">
                            <button className="btn text-danger btn-c2 me-2">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            {`${pedido.producto.nombre} (${pedido.cantidad})`}
                          </div>
                          <div>
                            <h6>{`₡${
                              pedido.producto.precio * pedido.cantidad
                            }`}</h6>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}

                    <h5 className="align-self-end">{`Total: ₡${total}`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ClienteMenu;
