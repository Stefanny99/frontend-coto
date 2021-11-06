import Menu from "../Menu";
import Header from "../Header";
// import { faShoppingBasket, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
    return (
        <div className="d-flex flex-column h-100">
            <div className="wrapper d-flex" id="wrap">
                <Menu></Menu>
                <div className="page-content-wrapper">
                    <Header></Header>
                    <div className="container-fluid mt-4">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
