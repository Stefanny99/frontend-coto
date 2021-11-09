import { Route, Routes } from "react-router-dom";
import { useGlobalState } from "../GlobalStateProvider";
import Login from "./Login";
import Socios from "./Socios";
import "./styles.scss";
import $ from 'jquery';
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect } from "react";
import Inventario from "./Inventario";

const Root = () => {
  const { setState } = useGlobalState();

  // se da un estado inicial al state global
  // cambia hasta que hace login
  useEffect(() => {
    setState({
      authenticated: false,
      user: undefined,
    });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/socios" element={<Socios />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="*" element={<h1>404 - PAGE NOT FOUND</h1>} />
    </Routes>
  );
};

export default Root;
