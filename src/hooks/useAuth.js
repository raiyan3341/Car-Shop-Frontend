import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
    // AuthContext থেকে user, loading, এবং সব ফাংশন অ্যাক্সেস করা হবে
    return useContext(AuthContext);
};

export default useAuth;