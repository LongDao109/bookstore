import { useEffect, useState } from "react";

import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import { Order } from "../../../types/order";
import apiClient from "../../../api/apiClient";
import TableOrder from "../../../components/tables/BasicTables/TableOrder";

export default function OrderTablePage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get("/orders").then((res) => {
            setOrders(res.data.data);
        });
    }, []);
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Order table
                </h2>
                <Button
                    size="sm"
                    onClick={() => navigate("/admin/orders/create")}
                >
                    <PlusIcon className="w-4 h-4" /> Add
                </Button>
            </div>
            <div className="space-y-6">
                <TableOrder orders={orders} />
            </div>
        </>
    );
}
