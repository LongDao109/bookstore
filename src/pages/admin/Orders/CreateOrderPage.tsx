import React, { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import apiClient from "../../../api/apiClient";
import { getBooks } from "../../../api/book";
import { IUser } from "../../../types/user";
import { Book } from "../../../types/book";

interface OrderItemInput {
    bookId: string;
    quantity: number;
    price: number;
}

export default function CreateOrderPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const [items, setItems] = useState<OrderItemInput[]>([]);
    const [formData, setFormData] = useState({
        userId: "",
        shippingAddress: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        billingAddress: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        paymentMethod: "credit_card",
        notes: "",
    });
    // const selectedUser = useMemo(() => {
    //     const user = users.find((item) => item._id === formData.userId);
    //     return user;
    // }, [formData.userId, users]);

    const handleItemChange = (
        index: number,
        field: string,
        value: string | number
    ) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    };

    const addItem = () => {
        setItems([...items, { bookId: "", quantity: 1, price: 0 }]);
    };

    const removeItem = (index: number) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string
    ) => {
        const { name, value } = e.target;
        if (section) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[
                        section as "shippingAddress" | "billingAddress"
                    ],
                    [name]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const subtotal = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        const discount = 0; // apply logic if coupon
        const total = subtotal - discount;

        const payload = {
            user: formData.userId,
            items: items.map((item) => ({
                book: item.bookId,
                quantity: item.quantity,
                price: item.price,
            })),
            shippingAddress: formData.shippingAddress,
            billingAddress: formData.billingAddress,
            paymentMethod: formData.paymentMethod,
            notes: formData.notes,
            subtotal,
            discount,
            total,
        };

        try {
            await apiClient.post("/orders", payload);
            alert("Order created successfully!");
        } catch (err) {
            console.log(err);

            alert("Error creating order.");
        }
    };
    useEffect(() => {
        getBooks().then((res) => {
            setBooks(res.data);
        });
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiClient.get("/users/all");
            setUsers(res.data.data);
        };
        fetchUsers();
    }, []);
    return (
        <>
            <PageMeta title="Creata new order" description="" />
            <div className="mx-auto p-6 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Create Order</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label
                            className="block text-sm font-medium mb-1"
                            htmlFor="userId"
                        >
                            User
                        </Label>
                        <Select
                            options={users.map((user) => ({
                                value: user._id,
                                label: user.email,
                            }))}
                            placeholder="Select an option"
                            onChange={(cid) =>
                                setFormData({ ...formData, userId: cid })
                            }
                            className="dark:bg-dark-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {["shippingAddress", "billingAddress"].map(
                            (section) => (
                                <div key={section}>
                                    <h3 className="text-lg font-semibold mb-2 capitalize">
                                        {section.replace("Address", " Address")}
                                    </h3>
                                    {[
                                        "street",
                                        "city",
                                        "state",
                                        "zipCode",
                                        "country",
                                    ].map((field) => (
                                        <div key={field}>
                                            <Label
                                                className="block text-sm font-medium mb-1 capitalize"
                                                htmlFor={field}
                                            >
                                                {field}
                                            </Label>
                                            <Input
                                                type="text"
                                                id={field}
                                                name={field}
                                                value={
                                                    formData[
                                                        section as
                                                            | "shippingAddress"
                                                            | "billingAddress"
                                                    ][
                                                        field as keyof typeof formData.shippingAddress
                                                    ]
                                                }
                                                onChange={(e) =>
                                                    handleChange(e, section)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium mb-1">
                            Payment Method
                        </Label>
                        <Select
                            options={[
                                { label: "Credit Card", value: "credit_card" },
                                { label: "paypal", value: "Paypal" },
                                { label: "Stripe", value: "stripe" },
                                { label: "Cash", value: "cash" },
                            ]}
                            placeholder="Select an option"
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    paymentMethod: value,
                                })
                            }
                            className="dark:bg-dark-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Order Items
                        </label>
                        {items?.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-2 mb-2 items-center"
                            >
                                <select
                                    value={item.bookId}
                                    onChange={(e) => {
                                        const book = books.find(
                                            (b) => b._id === e.target.value
                                        );
                                        console.log({ book });

                                        if (book) {
                                            const newItems = items.map(
                                                (item, i) =>
                                                    i === index
                                                        ? {
                                                              ...item,
                                                              bookId: book._id,
                                                              price: book.price,
                                                          }
                                                        : item
                                            );
                                            setItems(newItems);
                                            console.log(newItems);
                                        }
                                    }}
                                    className="p-2 border rounded"
                                >
                                    <option value="">Select Book</option>
                                    {books?.map((book) => (
                                        <option key={book._id} value={book._id}>
                                            {book.title}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "quantity",
                                            +e.target.value
                                        )
                                    }
                                    className="w-20 p-2 border rounded"
                                />
                                <span className="w-20 text-center">
                                    ${item.price}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 font-semibold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItem}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            + Add Item
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="notes"
                            placeholder="Notes (optional)"
                            value={formData.notes}
                            onChange={handleChange}
                            className="flex-1 p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    >
                        Submit Order
                    </button>
                </form>
            </div>
        </>
    );
}
