import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';

const Header = () => {
    function toogleMenu() {
        $(".menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrap").toggleClass("toggled");
        });
    }
    toogleMenu();
    return (
        <div className="bg-white d-flex justify-content-between py-0 shadow-primary menu-header">
            <button className="btn px-2 menu-toggle">
                <FontAwesomeIcon icon={faBars}/>
            </button>
            {/* <div>
                <button className="btn btn-dark px-2">
                    <FontAwesomeIcon icon={faShoppingCart}/> Carrito
                </button>
            </div> */}
        </div>
    );
};

export default Header;