import { IBookResponse, ICategoryResponse } from "../types";
import { IBookPayload } from "../types/book";
import apiClient from "./apiClient";

export const getBooks = async (): Promise<IBookResponse> => {
    const response = await apiClient.get("/books");
    return response.data;
};
export const getTopThreeBooks = async (): Promise<IBookResponse> => {
    const response = await apiClient.get("/books?limit=3");
    return response.data;
};

export const getCategories = async (): Promise<ICategoryResponse> => {
    const response = await apiClient.get("/categories");
    return response.data;
};
export const addBook = async (book: IBookPayload): Promise<IBookResponse> => {
    const response = await apiClient.post("/books", {
        ...book,
    });
    return response.data;
};

export const editBook = async (
    book: IBookPayload,
    id: string
): Promise<IBookResponse> => {
    const response = await apiClient.put(`/books/${id}`, {
        ...book,
    });
    return response.data;
};
