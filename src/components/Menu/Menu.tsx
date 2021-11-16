import {useHistory} from 'react-router-dom';
import { faShoppingBasket, faHome, faUserFriends, faShoppingCart, faBoxOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalState } from '../../GlobalStateProvider';

const Menu = () => {
    const history = useHistory();
    const {state: {user}} = useGlobalState();
    return (
        <div className="sidebar-wrapper d-flex flex-column hover-menu-items-parent">
            <div className="sidebar-heading bg-primary d-flex align-items-center p-3">
                <h4 className="text-white m-0"><FontAwesomeIcon icon={faShoppingBasket} className="me-2"/>El Ahorro</h4>
            </div>
            <div className="list-group mb-auto" id="list-tab">
                <div className={`list-group-item menu-items-var list-group-item-action ${history.location.pathname.split('/')[1] === "inicio" ? "active":""}`}
                    id="list-home-list"
                    onClick={() => history.push('/home')}
                    aria-controls="list-home"><FontAwesomeIcon icon={faHome} className="me-2"/>Inicio</div>
                <div className={`list-group-item menu-items-var list-group-item-action ${history.location.pathname.split('/')[1] === "socios" ? "active":""}`}
                    id="list-socios-list"
                    onClick={() => history.push('/socios')}
                    aria-controls="list-socios"><FontAwesomeIcon icon={faUserFriends} className="me-2"/>Socios</div>
                <div className={`list-group-item menu-items-var list-group-item-action ${history.location.pathname.split('/')[1] === "inventario" ? "active":""}`}
                    id="list-messages-list"
                    onClick={() => history.push('/inventario')}
                    aria-controls="list-messages"><FontAwesomeIcon icon={faBoxOpen} className="me-2"/>Inventario</div>
                <div className={`list-group-item menu-items-var list-group-item-action ${history.location.pathname.split('/')[1] === "ordenes" ? "active":""}`}
                    id="list-settings-list"
                    onClick={() => history.push('/ordenes')}
                    aria-controls="list-settings"><FontAwesomeIcon icon={faShoppingCart} className="me-2"/>Ordenes</div>
            </div>
            <div className="px-2 mb-2">
                <div className="border-top mx-2 my-2"></div>
                <div className="dropdown px-2 dropup">
                    <button className="btn text-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faUser} className="me-2"/> {user!.nombre}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li><a className="dropdown-item" href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
