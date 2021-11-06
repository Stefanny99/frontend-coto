import "./styles.scss";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Login from "./Login";
// import Home from "./Home";
// import { Routes, Route } from "react-router-dom";
import Socios from "./Socios";

const Root = () => {
	const isAuthenticated = true;
	return !isAuthenticated ? (
		<Login />
	) : (
		<>
			{/* <Routes> */}
				{/* <Route path="/"> */}
					{/* <Home /> */}
				{/* </Route> */}
				{/* <Route path="/socios"> */}
					<Socios />
				{/* </Route> */}
		 	{/* </Routes> */}
		</>
	);
}

export default Root;