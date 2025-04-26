import Logo from "../../assets/website/logo.png";
import { useAuthContext } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import DarkMode from "./DarkMode";

const ShopHeader = () => {
    const { currentUser } = useAuthContext();
    const { cart } = useCart();
    const cartItemCount = cart.length;
    return (
        <div className="fixed top-0 left-0 right-0 z-10 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
            <div className="container py-3 sm:py-0">
                <div className="flex justify-between items-center px-4">
                    <div>
                        <a
                            href="/"
                            className="font-bold text-2xl sm:text-3xl flex gap-2"
                        >
                            <img src={Logo} alt="Logo" className="w-10" />
                            Books
                        </a>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <DarkMode />
                        </div>
                        <ul className="hidden sm:flex items-center gap-4">
                            <li className=" inline-block py-4 px-4 hover:text-primary duration-200">
                                <a href={"/books"}>Books</a>
                            </li>
                            <li className=" inline-block py-4 px-4 hover:text-primary duration-200">
                                <a href={"/cart"} className="relative">
                                    Cart
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-3 text-xs text-black bg-white border rounded-full px-1">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </a>
                            </li>
                            {currentUser && currentUser.role == "admin" && (
                                <li className=" inline-block py-4 px-4 hover:text-primary duration-200">
                                    <a href={"/admin"} className="relative">
                                        Dashboard
                                    </a>
                                </li>
                            )}
                        </ul>
                        {/* <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3">
                                Order
                            </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopHeader;
