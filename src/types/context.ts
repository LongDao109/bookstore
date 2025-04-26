import { IUser } from "./user";

export interface AuthContextType {
    currentUser: IUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    updateCurrentUser: (newUser: IUser) => void;
    logout: () => void;
    register: (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => Promise<void>;
}
