import { Route, Switch } from "react-router-dom";
import Inventario from "../components/Inventario";
import Ordenes from "../components/Ordenes";
import Socios from "../components/Socios";

const ProtectedRoutes = () => (
  <Switch>
    <Route exact path="/">
      {/*<Home />*/}
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
  </Switch>
);

export default ProtectedRoutes;
