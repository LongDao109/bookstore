import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { IUser } from "../../../types/user";

interface Props {
    users: IUser[];
}

export default function TableUser({ users }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Id
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Email
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                FullName
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Role
                            </TableCell>
                            <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Wishlist
                            </TableCell>

                            {/* <TableCell className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                Actions
                            </TableCell> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="px-5 py-4">
                                    {user._id}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    {user.email}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {user.role}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400">
                                    {user.wishlist.length}
                                </TableCell>

                                {/* <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-400 ">
                                    <Link
                                        to={`/admin/users/edit/${user._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
