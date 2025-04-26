// context/CartContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Book } from "../types/book";
import { useAuthContext } from "./AuthProvider";

// Type for the Cart context
interface CartContextType {
    cart: { book: Book; quantity: number }[];
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: string) => void;
    clearCart: () => void;
    increaseQuantity: (bookId: string) => void;
    decreaseQuantity: (bookId: string) => void;
}

// Default values for the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap your app and provide cart state
export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { currentUser } = useAuthContext();
    const [cart, setCart] = useState<{ book: Book; quantity: number }[]>([]);

    // Load cart from localStorage when component mounts
    useEffect(() => {
        if (!currentUser) return;
        const storedCart = localStorage.getItem("cart" + currentUser._id);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Add a book to the cart (or update quantity if already in cart)
    const addToCart = (book: Book) => {
        if (!currentUser) return;
        const existingBook = cart.find((item) => item.book.id === book.id);
        let updatedCart: { book: Book; quantity: number }[];

        if (existingBook) {
            // If book exists, increase its quantity by 1
            updatedCart = cart.map((item) =>
                item.book.id === book.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // If book doesn't exist, add it to cart with quantity 1
            updatedCart = [...cart, { book, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem(
            "cart" + currentUser._id,
            JSON.stringify(updatedCart)
        );
    };

    // Remove a book from the cart
    const removeFromCart = (bookId: string) => {
        if (!currentUser) return;

        const updatedCart = cart.filter((item) => item.book.id !== bookId);
        setCart(updatedCart);
        localStorage.setItem(
            "cart" + currentUser._id,
            JSON.stringify(updatedCart)
        );
    };
    const increaseQuantity = (bookId: string) => {
        if (!currentUser) return;

        const updatedCart = cart.map((item) =>
            item.book.id === bookId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem(
            "cart" + currentUser._id,
            JSON.stringify(updatedCart)
        );
    };

    const decreaseQuantity = (bookId: string) => {
        if (!currentUser) return;

        const updatedCart = cart
            .map((item) =>
                item.book.id === bookId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0); // remove if quantity goes to 0

        setCart(updatedCart);
        localStorage.setItem(
            "cart" + currentUser._id,
            JSON.stringify(updatedCart)
        );
    };
    // Clear the cart
    const clearCart = () => {
        if (!currentUser) return;

        setCart([]);
        localStorage.removeItem("cart" + currentUser._id);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
