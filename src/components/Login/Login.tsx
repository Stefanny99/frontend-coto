import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import {
  faShoppingBasket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Animated } from "react-animated-css";
import { LOGIN } from "../../CRUD/usuario";
import { useGlobalState } from "../../GlobalStateProvider";
import swal from "sweetalert";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";

const initialState = {
  usuario: "",
  contrasena: "",
};

const Login = () => {
  const {
    state: { authenticated },
    setState,
  } = useGlobalState();

  const loginSchema = Yup.object().shape({
    usuario: Yup.string().required("Este campo es obligatorio"),
    contrasena: Yup.string().required("Este campo es obligatorio"),
  });

  const history = useHistory();

  const [callLogin] = useLazyQuery(LOGIN, {
    onCompleted: ({ user }) => {
      setState({ authenticated: true, user: user });
      history.push("/socios");
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

  const handleSubmit = (values) => {
    callLogin({ variables: { ...values } });
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
          <Formik
            initialValues={initialState}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              await handleSubmit(values);
            }}
          >
            {({ touched, errors, isSubmitting, handleSubmit }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isSubmitting = true;
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label fw-bold">
                    Usuario
                  </label>
                  <Field
                    type="text"
                    className={`form-control ${
                      touched.usuario && errors.usuario ? "is-invalid" : ""
                    }`}
                    id="usuario"
                    placeholder="Nombre de usuario"
                    name="usuario"
                  />
                  <ErrorMessage
                    component="div"
                    name="usuario"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    className={`form-control ${
                      touched.usuario && errors.usuario ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Contraseña"
                    name="contrasena"
                  />
                  <ErrorMessage
                    component="div"
                    name="contrasena"
                    className="invalid-feedback"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Iniciar Sesión <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Animated>
    </div>
  );
};

export default Login;
