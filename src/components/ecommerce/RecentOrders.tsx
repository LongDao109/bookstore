import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import TableOrder from "../tables/BasicTables/TableOrder";
import { useEffect, useState } from "react";
import { Order } from "../../types/order";
import apiClient from "../../api/apiClient";

// Define the TypeScript interface for the table rows
interface Product {
    id: number; // Unique identifier for each product
    name: string; // Product name
    variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
    category: string; // Category of the product
    price: string; // Price of the product (as a string with currency symbol)
    // status: string; // Status of the product
    image: string; // URL or path to the product image
    status: "Delivered" | "Pending" | "Canceled"; // Status of the product
}

// Define the table data using the interface
const tableData: Product[] = [
    {
        id: 1,
        name: "MacBook Pro 13”",
        variants: "2 Variants",
        category: "Laptop",
        price: "$2399.00",
        status: "Delivered",
        image: "/images/product/product-01.jpg", // Replace with actual image URL
    },
    {
        id: 2,
        name: "Apple Watch Ultra",
        variants: "1 Variant",
        category: "Watch",
        price: "$879.00",
        status: "Pending",
        image: "/images/product/product-02.jpg", // Replace with actual image URL
    },
    {
        id: 3,
        name: "iPhone 15 Pro Max",
        variants: "2 Variants",
        category: "SmartPhone",
        price: "$1869.00",
        status: "Delivered",
        image: "/images/product/product-03.jpg", // Replace with actual image URL
    },
    {
        id: 4,
        name: "iPad Pro 3rd Gen",
        variants: "2 Variants",
        category: "Electronics",
        price: "$1699.00",
        status: "Canceled",
        image: "/images/product/product-04.jpg", // Replace with actual image URL
    },
    {
        id: 5,
        name: "AirPods Pro 2nd Gen",
        variants: "1 Variant",
        category: "Accessories",
        price: "$240.00",
        status: "Delivered",
        image: "/images/product/product-05.jpg", // Replace with actual image URL
    },
];

export default function RecentOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        apiClient.get("/orders?limit=5").then((res) => {
            setOrders(res.data.data);
        });
    }, []);
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Recent Orders
                    </h3>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <TableOrder orders={orders} />
            </div>
        </div>
    );
}
