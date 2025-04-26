import { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import { IUser } from "../../../types/user";
import apiClient from "../../../api/apiClient";
import TableUser from "../../../components/tables/BasicTables/TableUser";

export default function UserTablePage() {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiClient.get("/users/all");
            setUsers(res.data.data);
        };
        fetchUsers();
    }, []);
    return (
        <>
            <PageMeta
                title="User table"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    User table
                </h2>
            </div>
            <div className="space-y-6">
                <TableUser users={users} />
            </div>
        </>
    );
}
