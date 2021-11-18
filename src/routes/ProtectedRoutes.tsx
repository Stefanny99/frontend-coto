import { Route, Switch } from "react-router-dom";
import ClienteProductos from "../components/ClienteProductos";
import Inventario from "../components/Inventario";
import Ordenes from "../components/Ordenes";
import Socios from "../components/Socios";

const ProtectedRoutes = ({ rol }) => (
  <Switch>
    {rol === "C" && (
      <Route exact path="/">
        <ClienteProductos />
      </Route>
    )}
    <Route exact path="/el_ahorro">
      <ClienteProductos />
    </Route>
    {rol === "A" && (
      <>
        <Route exact path="/">
          <Socios />
        </Route>
        <Route path="/socios">
          <Socios />
        </Route>
        <Route path="/inventario">
          <Inventario />
        </Route>
        <Route path="/ordenes">
          <Ordenes />
        </Route>
      </>
    )}
  </Switch>
);

export default ProtectedRoutes;
