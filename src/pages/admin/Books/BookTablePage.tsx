import { useEffect, useState } from "react";

import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import { Book } from "../../../types/book";
import { getBooks } from "../../../api/book";
import Button from "../../../components/ui/button/Button";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";

export default function BookTablePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooks = async () => {
            const res = await getBooks();
            setBooks(res.data);
        };
        fetchBooks();
    }, []);
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                    Book table
                </h2>
                <Button size="sm" onClick={() => navigate("/admin/books/add")}>
                    <PlusIcon className="w-4 h-4" /> Add
                </Button>
            </div>
            <div className="space-y-6">
                <BasicTableOne books={books} />
            </div>
        </>
    );
}
