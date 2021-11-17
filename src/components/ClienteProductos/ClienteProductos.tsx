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
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import ClienteMenu from "../ClienteMenu";

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
        }
  ]
  
  const history = useHistory();

  return (
    <>
      {!authenticated && (
        <div>
            <ClienteMenu></ClienteMenu>
            <div className="d-flex flex-column h-100">
                <div className="container-fluid">
                    <ul className="nav nav-pills my-5 px-5" id="pills-tab" role="tablist">
                        <li className="nav-item me-5" role="presentation">
                            <button className="nav-link active" id="pills-productos-tab" data-bs-toggle="pill" 
                            data-bs-target="#pills-productos" type="button" role="tab" aria-controls="pills-productos" aria-selected="true">Productos</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-servicios-tab" data-bs-toggle="pill" 
                            data-bs-target="#pills-servicios" type="button" role="tab" aria-controls="pills-servicios" aria-selected="false">Servicios</button>
                        </li>
                    </ul>
                    <div className="tab-content px-5" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-productos" role="tabpanel" aria-labelledby="pills-productos-tab">
                            <h2>Productos</h2>
                            <hr />
                            <div className="row mx-auto justify-content-center">
                                {productos.map(producto => (
                                    <div className="col-lg-3 col-md-5 mb-5 d-flex justify-content-center">
                                        <div className="card" style={{width:"18rem"}}>
                                            <img src="https://picsum.photos/200" className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title">{producto.nombre}</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex justify-content-start me-3">
                                                        <button className="btn btn-c2 me-2"><FontAwesomeIcon icon={faMinus} /></button>
                                                        <h4>2</h4>
                                                        <button className="btn btn-c2 ms-2"><FontAwesomeIcon icon={faPlus} /></button>
                                                    </div>
                                                    
                                                    <button className="btn btn-primary">Agregar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-servicios" role="tabpanel" aria-labelledby="pills-servicios-tab">
                            <h2>Servicios</h2>
                            <hr />
                            <div className="row mx-auto">
                                {productos.map(producto => (
                                    <div className="col-lg-3">
                                        <div className="card" style={{width:"18rem"}}>
                                            <img src="https://picsum.photos/200" className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title">{producto.nombre}</h5>
                                                <p className="card-text">{producto.descripcion}</p>
                                                <p className="card-text fw-bold">₡{producto.precio}</p>
                                                <hr />
                                                {/* show email and phone */}
                                                <a className="btn btn-light text-info w-100 d-block text-start" href="mailto:hola@gmail.com">
                                                    <FontAwesomeIcon icon={faEnvelope} className="me-2"/> hola@gmail.com
                                                </a>
                                                <a className="btn btn-light text-success w-100 d-block text-start my-2" href="tel:84018895">
                                                    <FontAwesomeIcon icon={faPhone} className="me-2"/> 84018895
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
