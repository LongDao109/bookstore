import { BookCategory } from "./category";

export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    category: BookCategory;
    price: number;
    salePrice?: number;
    stock: number;
    format: string;
    pageCount: number;
    // publishDate?: string;
    publisher?: string;
    coverImage: string;
    featured: boolean;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export type IBookPayload = Omit<
    Book,
    | "id"
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "__v"
    | "reviewCount"
    | "rating"
    | "category"
> & {
    category: string;
};
