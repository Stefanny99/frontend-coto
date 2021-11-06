import { Route } from "react-router-dom";
import Tabla from "./tabla";
import Login from "./Login";
const Root = () => {
    const isAuthenticated = false;
    return !isAuthenticated ? (
        <Login/>
      ) : (
        <>
            <Route path="/">
                <Tabla/>
            </Route>
            <Route path="/productos">
                <Tabla/>
            </Route>
        </>
      );
}

export default Root;