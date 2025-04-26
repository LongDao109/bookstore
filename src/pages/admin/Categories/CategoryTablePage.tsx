import { useEffect, useState } from "react";

import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import { getCategories } from "../../../api/book";
import Button from "../../../components/ui/button/Button";
import { Category } from "../../../types/category";
import TableCategory from "../../../components/tables/BasicTables/TableCategory";

export default function CategoryTablePage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

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
                    Category table
                </h2>
                <Button
                    size="sm"
                    onClick={() => navigate("/admin/categories/add")}
                >
                    <PlusIcon className="w-4 h-4" /> Add
                </Button>
            </div>
            <div className="space-y-6">
                <TableCategory categories={categories} />
            </div>
        </>
    );
}
