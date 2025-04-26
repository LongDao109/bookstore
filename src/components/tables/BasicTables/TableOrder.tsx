import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Order } from "../../../types/order";

interface Props {
    orders: Order[];
}

export default function TableOrder({ orders }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                Order ID
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                User
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                Items
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                Total
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
                            >
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="px-5 py-4 text-start">
                                    {order._id}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    {order.user?.email || ""}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    <ul className="space-y-1">
                                        {order.items.map((item, i) => (
                                            <li key={i}>
                                                {item.book.title} ×{" "}
                                                {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    ${order.total.toFixed(2)}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start capitalize">
                                    {order.status}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-start">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
