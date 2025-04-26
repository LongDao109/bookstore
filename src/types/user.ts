export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    wishlist: any[];
    addresses: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
