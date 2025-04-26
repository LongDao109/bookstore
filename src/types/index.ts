import { Book } from "./book";
import { Category } from "./category";
import { IUser } from "./user";

export interface IAuthResponse {
    success: boolean;
    token: string;
    data: IUser;
    error?: string;
}

export interface IGetUserMe {
    success: boolean;
    data: IUser;
    error?: string;
}

export interface IBookResponse {
    success: boolean;
    count: number;
    data: Book[];
    error?: string;
}

export interface ICategoryResponse {
    success: boolean;
    count: number;
    data: Category[];
    error?: string;
}
