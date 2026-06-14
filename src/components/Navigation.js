import {Link, Outlet} from "react-router-dom";
import "../App.css";

const Navigation = () => {
    return (
        <div className="app-container">
            <nav className="navbar">
                <h1 className="logo">🏢 Building Manager</h1>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/create">Add Building</Link>
                    <Link to="/jwt">My JWT</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};
export default Navigation;