import { Outlet, useNavigate } from "react-router";
import ShopHeader from "../components/header/ShopHeader";
import { CartProvider } from "../context/CartContext";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";

const StoreLayout: React.FC = () => {
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser]);
    return (
        <CartProvider>
            <main>
                <ShopHeader />
                <div className="pt-20">
                    <Outlet />
                </div>
            </main>
        </CartProvider>
    );
};

export default StoreLayout;
