import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContentProvider";
import { useNavigate } from "react-router-dom";

const ReverseProtectedRoutes = ({ Comp }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user) {
        return null;
    }

    return <Comp />;
};

export default ReverseProtectedRoutes;