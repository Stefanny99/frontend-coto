import Menu from "../Menu";
import Header from "../Header";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLazyQuery } from "@apollo/client";
import { GetSocios } from "../../CRUD/socio";
import { useGlobalState } from "../../GlobalStateProvider";
import { useNavigate } from "react-router-dom";

const Socios = () => {
  const navigate = useNavigate();

  const {
    state: { authenticated },
  } = useGlobalState();

  const [callGetSocios, { called, loading, error, data }] =
    useLazyQuery(GetSocios);

  if (!authenticated) navigate("/login");
  else {
    callGetSocios();
    if (called && loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  }

  return (
    <>
      {authenticated && (
        <div className="d-flex flex-column h-100">
          <div className="wrapper d-flex" id="wrap">
            <Menu></Menu>
            <div className="page-content-wrapper">
              <Header></Header>
              <div className="container-fluid mt-4 px-3">
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-8">
                      <h1 className="fw-bold">Lista de Socios</h1>
                      <p className="text-muted">
                        Lista de socios en el sistema
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <h1 className="text-primary fw-bold display-5">1</h1>
                        <small className="text-muted">Socios</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-primary p-3 rounded-15 mb-3">
                  <div className="row mx-auto">
                    <div className="col-md-9">
                      {/* search */}
                      <div className="mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Buscar..."
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      {/* add */}
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Agregar Socio
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-primary rounded-15 mb-3">
                  <div className="tableHolder mt-4">
                    <table className="table table-hover table-borderless">
                      <thead className="table-primary">
                        <tr>
                          <th>#</th>
                          <th>Cedula</th>
                          <th>Nombre</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      {data.test.map(({ id, cedula, nombre, estado }) => (
                        <tbody>
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{cedula}</td>
                            <td>{nombre}</td>
                            <td>{estado}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Socios;
