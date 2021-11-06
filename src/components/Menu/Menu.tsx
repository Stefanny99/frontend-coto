import { faShoppingBasket, faHome, faUserFriends, faShoppingCart, faBoxOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = () => {
    return (
        <div className="sidebar-wrapper d-flex flex-column hover-menu-items-parent">
            <div className="sidebar-heading bg-primary d-flex align-items-center p-3">
                <h4 className="text-white m-0"><FontAwesomeIcon icon={faShoppingBasket} className="me-2"/>El Ahorro</h4>
            </div>
            <div className="list-group mb-auto" id="list-tab">
                <a className="list-group-item menu-items-var list-group-item-action active"
                    id="list-home-list"
                    href="/home"
                    aria-controls="list-home"><FontAwesomeIcon icon={faHome} className="me-2"/>Inicio</a>
                <a className="list-group-item menu-items-var list-group-item-action"
                    id="list-socios-list"
                    href="/socios"
                    aria-controls="list-socios"><FontAwesomeIcon icon={faUserFriends} className="me-2"/>Socios</a>
                <a className="list-group-item menu-items-var list-group-item-action"
                    id="list-messages-list"
                    href="/inventario"
                    aria-controls="list-messages"><FontAwesomeIcon icon={faBoxOpen} className="me-2"/>Inventario</a>
                <a className="list-group-item menu-items-var list-group-item-action"
                    id="list-settings-list"
                    href="/ordenes"
                    aria-controls="list-settings"><FontAwesomeIcon icon={faShoppingCart} className="me-2"/>Ordenes</a>
            </div>
            <div className="px-2 mb-2">
                <div className="border-top mx-2 my-2"></div>
                <div className="dropdown px-2 dropup">
                    <button className="btn text-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faUser} className="me-2"/> Nombre Admin
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
