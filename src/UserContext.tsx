import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"

interface UserContextType {
    users: any[];
    addUser: (user: any) => void;
    isUserFormOpen: boolean;
    setIsUserFormOpen: (open: boolean) => void
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<any[]>([]);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await res.json();
                setUsers(data);
                setIsLoading(false)

            } catch (error) {
                alert("Error fetching user data")
                console.error(error)
                setIsLoading(false)
            }
        };
        fetchUsers();
    }, []);

    const addUser = (user: any) => {
        setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
    };

    return (
        <UserContext.Provider value={{ users, addUser, isUserFormOpen, setIsUserFormOpen, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within UserProvider");
    return context;
};
