import Logo from "../../assets/website/logo.png";
import { useAuthContext } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import DarkMode from "./DarkMode";

const Menu = [
    {
        id: 1,
        name: "Books",
        link: "/books",
    },
    {
        id: 2,
        name: "Cart",
        link: "/cart",
    },
];

const DropdownLinks = [
    {
        name: "Trending Books",
        link: "/#",
    },
    {
        name: "Best Selling",
        link: "/#",
    },
    {
        name: "Authors",
        link: "/#",
    },
];

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
                            {/* Simple Dropdown and Links */}
                            <li className="group relative cursor-pointer">
                                <a
                                    href="/profile"
                                    className="flex h-[72px] items-center gap-[2px]"
                                >
                                    User
                                    <span>
                                        {/* <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" /> */}
                                    </span>
                                </a>
                                <div className="absolute right-0 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                                    <ul className="space-y-3">
                                        {DropdownLinks.map((data) => (
                                            <li key={data.name}>
                                                <a
                                                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                                                    href={data.link}
                                                >
                                                    {data.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
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
