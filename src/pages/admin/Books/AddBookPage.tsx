import PageMeta from "../../../components/common/PageMeta";

import React, { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { IBookPayload } from "../../../types/book";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Label from "../../../components/form/Label";
import TextArea from "../../../components/form/input/TextArea";
import Checkbox from "../../../components/form/input/Checkbox";
import Button from "../../../components/ui/button/Button";
import { addBook, getCategories } from "../../../api/book";
import { useNavigate } from "react-router";

export default function AddBookPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");

    const navigate = useNavigate();
    const handleAddBook = async (book: IBookPayload) => {
        try {
            const res = await addBook(book);
            if (res.success) {
                navigate("/admin/books");
            } else {
                setErrorMessage(res.error);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchCategoreis = async () => {
            const res = await getCategories();
            setCategories(res.data);
        };
        fetchCategoreis();
    }, []);
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Add new book
                </h2>
            </div>
            <div className="space-y-6">
                <BookForm
                    categories={categories}
                    onSubmit={handleAddBook}
                    errorMessage={errorMessage}
                />
            </div>
        </>
    );
}

interface BookFormProps {
    categories: Category[];
    onSubmit: (book: IBookPayload) => void;
    errorMessage?: string;
}
function BookForm({ categories, onSubmit, errorMessage }: BookFormProps) {
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        isbn: "",
        category: categories[0]?.id || "",
        price: 0,
        salePrice: 0,
        stock: 0,
        format: "",
        pageCount: 0,
        language: "",
        publishDate: "",
        publisher: "",
        coverImage: "",
        featured: false,
    });
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log(form);

        onSubmit({
            ...form,
        });
    };

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="isbn">Isbn</Label>
                        <Input
                            type="text"
                            id="isbn"
                            name="isbn"
                            value={form.isbn}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                            type="text"
                            id="author"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Category</Label>
                            <Select
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                                placeholder="Select an option"
                                onChange={(cid) =>
                                    setForm({ ...form, category: cid })
                                }
                                className="dark:bg-dark-900"
                            />
                        </div>
                        <div>
                            <Label>Format</Label>
                            <Select
                                options={[
                                    "Hardcover",
                                    "Paperback",
                                    "E-book",
                                    "Audiobook",
                                ].map((item) => ({ value: item, label: item }))}
                                placeholder="Select an option"
                                onChange={(value) =>
                                    setForm({ ...form, format: value })
                                }
                                className="dark:bg-dark-900"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="salePrice">Sale Price</Label>
                            <Input
                                type="number"
                                id="salePrice"
                                name="salePrice"
                                value={form.salePrice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                            type="text"
                            id="publisher"
                            name="publisher"
                            value={form.publisher}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="coverImage">Cover Image</Label>
                        <Input
                            type="text"
                            id="coverImage"
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="pageCount">Page Count</Label>
                            <Input
                                type="number"
                                id="pageCount"
                                name="pageCount"
                                value={form.pageCount}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                type="number"
                                id="stock"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Label>Description</Label>
                <TextArea
                    value={form.description}
                    onChange={(value) =>
                        setForm({ ...form, description: value })
                    }
                    rows={6}
                />
            </div>

            <div className="flex items-center gap-3 my-4">
                <Checkbox
                    checked={form.featured}
                    onChange={(checked) =>
                        setForm({ ...form, featured: checked })
                    }
                />
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Featured Book
                </span>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button
                size="sm"
                onClick={handleSubmit}
                // className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Save Book
            </Button>
        </div>
    );
}
