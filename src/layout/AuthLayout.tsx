import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";

const AuthLayout: React.FC = () => {
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthLayout;
