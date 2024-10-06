import { ReactNode } from "react";

// Type for the Loader Props
export interface ILoaderProps {
  size?: number;
  color?: string;
}

// Generic Type for the table data
export interface TableProps<T extends User> {
  columns: Array<{ header: string; accessor: keyof T }>; // Array of column headers and keys
  data: T[]; // Array of data objects
  actions?: (item: T) => ReactNode; // Optional actions like Edit/Delete
}

// Types for users
type Address = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: {
    lat: string;
    lng: string;
  };
};
export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: Address;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

// Types for user-form
export interface UserFormProps {
  user?: User | null;
  onClose: () => void;
}
