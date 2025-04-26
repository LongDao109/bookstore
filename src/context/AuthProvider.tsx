import React, { useState, ReactNode, useContext, createContext } from "react";
import { AuthContextType } from "../types/context";
import { IUser } from "../types/user";
import {
    getToken,
    login as authLogin,
    setToken as setSessionToken,
    setUser as setSessionUser,
    getUser as getSessionUser,
    register as authRegister,
    removeToken,
} from "../api/auth";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    token: null,
    loading: true,
    login: async () => {},
    logout: () => {},
    updateCurrentUser: () => {},
    register: async () => {},
});
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(() =>
        getSessionUser()
    );
    const [token, setToken] = useState<string | null>(() => getToken());
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (email: string, password: string) => {
        const res = await authLogin(email, password);
        console.log({ loginResponse: res });

        setSessionToken(res.token);
        setSessionUser(res.data);
        setToken(res.token);
        setCurrentUser(res.data);
    };
    const register = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        const res = await authRegister(firstName, lastName, email, password);

        setSessionToken(res.token);
        setSessionUser(res.data);
        setToken(res.token);
        setCurrentUser(res.data);
    };
    const updateCurrentUser = async (newUser: IUser) => {
        setCurrentUser(newUser);
    };

    const logout = () => {
        removeToken();
        setToken(null);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                token,
                loading,
                login,
                logout,
                register,
                updateCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
