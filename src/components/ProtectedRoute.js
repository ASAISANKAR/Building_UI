import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const basic = localStorage.getItem("auth");
    const jwt = localStorage.getItem("jwt");
    const oauth = localStorage.getItem("oauth");

    const isAuthenticated = basic || jwt || oauth;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
