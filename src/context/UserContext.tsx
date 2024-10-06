// UserContext.tsx
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/type";
import axios from "axios";

interface UserContextType {
  users: User[];
  isLoading: boolean;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const storedUsers = JSON.parse(localStorage.getItem("users")!) || [];

      if (storedUsers.length === 0) {
        // Fetch from API only if local storage is empty
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users?_limit=10"
          );
          const initialUsers = response.data;

          // Populate local storage with initial data
          localStorage.setItem("users", JSON.stringify(initialUsers));
          setUsers(initialUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        // Load users from local storage
        setUsers(storedUsers);
      }

      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => {
  //       setUsers(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.error("Error fetching users:", error);
  //     });
  // }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        users,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
