import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ScaleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <ScaleLoader color="#36d7b7" />
            </div>
        );
    }

    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;