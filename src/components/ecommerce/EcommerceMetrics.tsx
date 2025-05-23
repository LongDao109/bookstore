import { useEffect, useState } from "react";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    BoxIconLine,
    GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import apiClient from "../../api/apiClient";
import { IUser } from "../../types/user";

export default function EcommerceMetrics() {
    const [totalOrders, setTotalOrders] = useState<number>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiClient.get("/users/all");
            setUsers(res.data.data);
        };
        fetchUsers();
    }, []);
    useEffect(() => {
        apiClient.get("/orders/stats/current-month").then((res) => {
            setTotalOrders(res.data.totalOrders);
        });
    }, []);
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Customers
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {users.length}
                        </h4>
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        11.01%
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Orders
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {totalOrders}
                        </h4>
                    </div>

                    <Badge color="error">
                        <ArrowDownIcon />
                        9.05%
                    </Badge>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
        </div>
    );
}
