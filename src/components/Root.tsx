import { Route } from "react-router-dom";
import Tabla from "./tabla";
const Root = () => {
    const isAuthenticated = true;
    return !isAuthenticated ? (
        // <Register />
        <h1>login</h1>
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