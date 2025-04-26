import { IAuthResponse } from "../types";
import { IUser } from "../types/user";
import apiClient from "./apiClient";

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): Promise<IAuthResponse> => {
    const response = await apiClient.post("/users/register", {
        firstName,
        lastName,
        email,
        password,
    });
    return response.data;
};
export const login = async (
    email: string,
    password: string
): Promise<IAuthResponse> => {
    const response = await apiClient.post("/users/login", { email, password });
    return response.data;
};
export const getToken = () => sessionStorage.getItem("token");
export const setToken = (token: string) =>
    sessionStorage.setItem("token", token);

export const setUser = (user: IUser) => {
    sessionStorage.setItem("user", JSON.stringify(user));
};
export const getUser = (): IUser | null => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeToken = () => sessionStorage.removeItem("token");
