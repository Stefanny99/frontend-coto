import { useLazyQuery } from "@apollo/client";
import {
  faShoppingBasket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Animated } from "react-animated-css";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../CRUD/usuario";
import { useGlobalState } from "../../GlobalStateProvider";
import swal from "sweetalert";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {
    state: { authenticated },
    setState,
  } = useGlobalState();
  const [callLogin] = useLazyQuery(LOGIN, {
    onCompleted: ({ user }) => {
      setState({ authenticated: true, user: user });
    },
    onError: ({ message }) => {
      swal({
        title: "¡Error!",
        text: message,
        icon: "error",
        timer: 4000,
      });
    },
  });

  useEffect(() => {
    if (authenticated) {
      navigate("/socios");
    }
  }, [authenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //validar que los campos estén llenos primero, luego:
    // login({variables: {username: inputs.username, password: inputs.password} });
    callLogin({
      variables: {
        usuario: "admin",
        contrasena: "admin",
      },
    });
  };

  return (
    <div className="wrapperLogin">
      <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
        <div className="login-form">
          <div className="form-header mb-2">
            <h1 className="fw-bold">
              Login{" "}
              <FontAwesomeIcon icon={faShoppingBasket} className="text-info" />
            </h1>
            <p>Cooperativa El Ahorro</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label fw-bold">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Nombre de usuario"
                name="usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                name="pass"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
        </div>
      </Animated>
    </div>
  );
};

export default Login;
