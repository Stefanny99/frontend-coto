import { faShoppingBasket, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Animated} from "react-animated-css";


const Login = () => {
    return (
        <div className="wrapperLogin">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <div className="login-form">
                    <div className="form-header mb-2">
                        <h1 className="fw-bold">Login <FontAwesomeIcon icon={faShoppingBasket} className="text-info" /></h1>
                        <p>Cooperativa El Ahorro</p>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label fw-bold">Usuario</label>
                            <input type="text" className="form-control" id="usuario" placeholder="Nombre de usuario" name="usuario" />
                            <div id="usuarioHelp" className="form-text">No compartiremos tu correo con nadie mas.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                            <input type="password" className="form-control" id="password" placeholder="Contraseña" name="pass"/>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Iniciar Sesión <FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </form>
                </div>
            </Animated>
        </div>
    );
};

export default Login;
