import { CheckCircleIcon } from "lucide-react";
import { Category } from "../../../types/category";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Link } from "react-router";

interface Props {
    categories: Category[];
}

export default function TableCategory({ categories }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Image
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Name
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Description
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Featured
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Books
                            </TableCell>

                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="px-5 py-4">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="h-12 w-8 object-cover rounded"
                                    />
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    {category.name}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {category.description}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {category.featured ? (
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <CheckCircleIcon className="w-5 h-5 text-gray-500" />
                                    )}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {category.books.length}
                                </TableCell>

                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400 ">
                                    <Link
                                        to={`/admin/categories/edit/${category._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
