import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ScaleLoader } from "react-spinners"; // Loading Spinner Requirement

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Loading Spinner Display (Requirement)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }

    // Redirect to Login if no user is found
    if (user) {
        return children;
    }

    // Pass the current path to the state so the user can be redirected back after login
    return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;