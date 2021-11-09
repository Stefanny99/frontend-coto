import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = () => {
    
    return (
        <div className="bg-white d-flex justify-content-between py-0 shadow-primary menu-header">
            <button className="btn px-2 menu-toggle">
                <FontAwesomeIcon icon={faBars}/>
            </button>
        </div>
    );
};

export default Header;