// pages/CartPage.tsx

import apiClient from "../../api/apiClient";
import PageMeta from "../../components/common/PageMeta";
import { useAuthContext } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
    const { currentUser } = useAuthContext();
    const {
        cart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        increaseQuantity,
    } = useCart();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + (item.book.salePrice ?? item.book.price) * item.quantity,
        0
    );
    if (cart.length === 0) {
        return <div>Your cart is empty</div>;
    }

    const handleOrder = async () => {
        if (!currentUser) return;
        const payload = {
            user: currentUser._id,
            items: cart.map((item) => ({
                book: item.book._id,
                quantity: item.quantity,
                price: item.book.salePrice ?? item.book.price,
            })),

            paymentMethod: "cash",
            subtotal: totalPrice,
            total: totalPrice,
        };

        try {
            await apiClient.post("/orders", payload);
            alert("Order created successfully!");
            clearCart();
        } catch (err) {
            console.log(err);

            alert("Error creating order.");
        }
    };

    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className=" max-w-7xl mx-auto">
                <h1 className="text-3xl">Your Cart</h1>
                <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">
                    <div className="w-full lg:w-3/4 space-y-6">
                        {cart.map(({ book, quantity }) => (
                            <div
                                key={book.id}
                                className="flex justify-between items-center border-b pb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {book.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {book.author}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(book.id)
                                                }
                                                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded"
                                            >
                                                −
                                            </button>
                                            <span className="min-w-[24px] text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    increaseQuantity(book.id)
                                                }
                                                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(book.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full lg:w-1/4  p-4  rounded sticky top-6 h-fit">
                        <h2 className="text-lg font-semibold mb-4">
                            Cart Summary
                        </h2>
                        <div className="flex justify-between mb-2">
                            <span>Total Items:</span>
                            <span>{totalItems}</span>
                        </div>
                        <div className="flex justify-between mb-4 font-medium">
                            <span>Total Price:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium"
                            onClick={handleOrder}
                        >
                            Process to Order
                        </button>

                        <button
                            className="w-full mt-3 text-sm text-gray-500 hover:underline"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
