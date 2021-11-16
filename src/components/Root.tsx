import { Route, Switch, Redirect } from "react-router-dom";
import { useGlobalState } from "../GlobalStateProvider";
import { useEffect } from "react";
import "./styles.scss";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";
import PublicRoute from "../routes/PublicRoute";
import PrivateRoute from "../routes/PrivateRute";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import Login from "./Login";

const Root = () => {
  const {
    state: { authenticated },
    setState,
  } = useGlobalState();

  // se da un estado inicial al state global
  // cambia hasta que hace login
  useEffect(() => {
    setState({
      authenticated: false,
      user: undefined,
    });
  }, []);

  return (
    <>
      {authenticated === undefined ? (
        <h1>cargando...</h1>
      ) : (
        <Switch>
          <PublicRoute exact path="/login" isAuthenticated={authenticated}>
            <Login />
          </PublicRoute>
          {/*<PublicRoute exact path="/register" isAuthenticated={authenticated}>
            <Register />
          </PublicRoute>*/}
          <PrivateRoute path="/" isAuthenticated={authenticated}>
            <ProtectedRoutes />
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
