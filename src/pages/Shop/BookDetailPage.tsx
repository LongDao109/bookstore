import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { useParams } from "react-router";
import { Book } from "../../types/book";
import publicApiClient from "../../api/publicApiClient";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        console.log({ book });

        if (!book) return;
        addToCart(book);
        toast.success(`${book.title} added to cart`);
    };
    useEffect(() => {
        if (id) {
            publicApiClient.get(`/books/${id}`).then((res) => {
                setBook(res.data.data);
            });
        }
    }, [id]);

    if (!book) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="">
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex flex-col md:flex-row gap-10 p-8 max-w-7xl mx-auto">
                {/* Cover Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full max-h-[600px] object-contain rounded-xl shadow"
                    />
                </div>

                {/* Book Info */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {book.title}
                        </h1>
                        <p className="text-lg text-gray-500">
                            by {book.author}
                        </p>
                    </div>

                    <p className="text-gray-700">{book.description}</p>

                    <div className="space-y-2">
                        <p>
                            <strong>Category:</strong> {book.category?.name}
                        </p>

                        <p>
                            <strong>Rating:</strong> {book.rating}
                        </p>
                        <p>
                            <strong>Pages:</strong> {book.pageCount}
                        </p>
                        <p>
                            <strong>Format:</strong> {book.format}
                        </p>
                        <p>
                            <strong>ISBN:</strong> {book.isbn}
                        </p>

                        <p>
                            <strong>Publisher:</strong> {book.publisher}
                        </p>
                        <p>
                            <strong>Stock:</strong> {book.stock}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-semibold text-indigo-600">
                            ${book.salePrice ?? book.price}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
