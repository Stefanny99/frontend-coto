import { Route, Switch, Redirect } from "react-router-dom";
import { useGlobalState } from "../GlobalStateProvider";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLazyQuery } from "@apollo/client";
import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRute";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Login from "./Login";
import "./styles.scss";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { OBTENER_USUARIO } from "../CRUD/usuario";
const Root = () => {
  const {
    state: { authenticated, user },
    setState,
  } = useGlobalState();

  const [obtenerUsuario] = useLazyQuery(OBTENER_USUARIO, {
    onCompleted: ({ user }) => setState({ authenticated: true, user }),
  });

  const [cookies] = useCookies(["authenticated", "userID"]);

  useEffect(() => {
    if (cookies.authenticated) {
      obtenerUsuario({ variables: { id: cookies.userID } });
    } else {
      setState({ authenticated: false, user: undefined });
    }
  }, []);

  return (
    <>
      {authenticated === undefined ? (
        <div className="vw-100 vh-100">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-grow text-primary" role="status">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <Switch>
          <PublicRoute exact path="/login" isAuthenticated={authenticated}>
            <Login />
          </PublicRoute>
          {/*<PublicRoute exact path="/register" isAuthenticated={authenticated}>
            <Register />
          </PublicRoute>*/}
          <PrivateRoute path="/" isAuthenticated={authenticated}>
            <ProtectedRoutes rol={user?.rol} />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default Root;
