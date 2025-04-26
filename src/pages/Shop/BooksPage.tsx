import { useState, useEffect, useCallback } from "react";

import { Book } from "../../types/book";
import apiClient from "../../api/apiClient";
import Input from "../../components/form/input/InputField";
import { Category } from "../../types/category";
import { getCategories } from "../../api/book";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { debounce } from "lodash";
import axios from "axios";
import publicApiClient from "../../api/publicApiClient";
import Checkbox from "../../components/form/input/Checkbox";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [featured, setFeatured] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        apiClient.get("/books").then((res) => {
            setBooks(res.data.data);
            setFilteredBooks(res.data.data);
        });
    }, []);
    useEffect(() => {
        getCategories().then((res) => setCategories(res.data));
    }, []);

    const debounceSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearch(value);
        }, 500),
        []
    );

    useEffect(() => {
        debounceSearch(search);
    }, [search, debounceSearch]);

    useEffect(() => {
        const params: Record<string, string> = {};

        if (debouncedSearch) params.query = debouncedSearch;
        if (category) params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (featured) params.featured = featured;
        if (publishDate) params.publishDate = publishDate;

        if (Object.keys(params).length === 0) {
            setFilteredBooks(books);
            return;
        }
        const query = new URLSearchParams(params).toString();
        publicApiClient
            .get(`/books/search?${query}`)
            .then((res) => {
                setFilteredBooks(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [
        debouncedSearch,
        category,
        minPrice,
        maxPrice,
        featured,
        publishDate,
        books,
    ]);

    return (
        <div className="">
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex gap-6 p-6">
                {/* Sticky Sidebar */}
                <aside className="w-1/5 space-y-6 sticky top-6 h-fit">
                    <div>
                        <Label className="block mb-1 text-sm font-semibold text-gray-700">
                            Search
                        </Label>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Title, author, ISBN..."
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        {categories
                            .map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))
                            .map((item) => (
                                <div
                                    className="flex items-center gap-3 my-4"
                                    key={item.value}
                                >
                                    <Checkbox
                                        checked={category == item.value}
                                        onChange={(checked) => {
                                            if (checked) {
                                                setCategory(item.value);
                                            } else {
                                                setCategory("");
                                            }
                                        }}
                                        id={item.label}
                                    />
                                    <Label
                                        htmlFor={item.label}
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                    >
                                        {item.label}
                                    </Label>
                                </div>
                            ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="block mb-1 text-sm font-semibold text-gray-700">
                            Price range
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="Min $"
                                className="w-1/2 rounded-lg border px-3 py-2 text-sm"
                            />
                            <Input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="Max $"
                                className="w-1/2 rounded-lg border px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="block mb-1 text-sm font-semibold text-gray-700">
                            Featured
                        </Label>
                        {[
                            { label: "All", value: "" },
                            { label: "Featured", value: "true" },
                            { label: "Not Featured", value: "false" },
                        ].map((item) => (
                            <div className="flex items-center gap-3 my-2">
                                <Checkbox
                                    checked={featured == item.value}
                                    onChange={(checked) => {
                                        if (checked) {
                                            setFeatured(item.value);
                                        } else {
                                            setFeatured("");
                                        }
                                    }}
                                    id={item.label}
                                />
                                <Label
                                    htmlFor={item.label}
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </div>

                    {/* <div>
          <Label className="block mb-1 text-sm font-semibold text-gray-700">Publish Year</Label>
          <Input
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            placeholder="e.g. 2024"
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
          
        </div> */}
                </aside>

                {/* Books Grid */}
                <main className="w-4/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <Link
                                to={`/books/${book._id}`}
                                key={book.id}
                                className="block rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="mb-3 h-48 w-full object-cover rounded"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-1">
                                        by {book.author}
                                    </p>
                                    <p className="text-sm font-medium text-indigo-600">
                                        ${book.salePrice || book.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

// const BookPage = () => {
//     const [books, setBooks] = useState<Book[]>([]);
//     const [categories, setCategories] = useState<Category[]>([]);

//     useEffect(() => {
//         const fetchCategoreis = async () => {
//             const res = await getCategories();
//             setCategories(res.data);
//         };
//         fetchCategoreis();
//     }, []);
//     const [search, setSearch] = useState("");
//     const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

//     useEffect(() => {
//         apiClient.get("/books").then((res) => {
//             setBooks(res.data.data);
//             setFilteredBooks(res.data.data);
//         });
//     }, []);

//     useEffect(() => {
//         const query = search.toLowerCase();
//         setFilteredBooks(
//             books.filter(
//                 (book) =>
//                     book.title.toLowerCase().includes(query) ||
//                     book.author.toLowerCase().includes(query)
//             )
//         );
//     }, [search, books]);

//     return (
//         <div>
//             <PageMeta
//                 title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//                 description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//             />
//             <ShopHeader />
//             <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden pt-10">
//                 <div className="flex gap-6 p-6 mt-6 ">
//                     {/* Sidebar */}
//                     <aside className="w-1/5 space-y-6 sticky top-6 h-fit">
//                         <div>
//                             <label className="block mb-2 text-sm font-semibold text-gray-600">
//                                 Search
//                             </label>
//                             <Input
//                                 type="text"
//                                 placeholder="Search by title or author"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
//                             />
//                         </div>
//                         {/* Add filters here like category, price range, etc. */}
//                         <div>
//                             <Label>Category</Label>
//                             <Select
//                                 options={categories.map((category) => ({
//                                     value: category.id,
//                                     label: category.name,
//                                 }))}
//                                 placeholder="Select an option"
//                                 onChange={
//                                     (cid) => {}
//                                     // setForm({ ...form, category: cid })
//                                 }
//                                 className="dark:bg-dark-900"
//                             />
//                         </div>
//                     </aside>

//                     {/* Books Grid */}
//                     <main className="w-4/5">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {filteredBooks.map((book) => (
//                                 <div
//                                     key={book.id}
//                                     className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
//                                 >
//                                     <img
//                                         src={
//                                             book.coverImage ||
//                                             "/placeholder.jpg"
//                                         }
//                                         alt={book.title}
//                                         className="mb-3 h-48 w-full object-cover rounded"
//                                     />
//                                     <h3 className="text-lg font-semibold text-gray-800">
//                                         {book.title}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mb-1">
//                                         by {book.author}
//                                     </p>
//                                     <p className="text-sm font-medium text-indigo-600">
//                                         ${book.salePrice || book.price}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookPage;
