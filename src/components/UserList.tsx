import { User } from "../types/type";
import Table from "./Table";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useUserContext } from "../context/UserContext";
import Loader from "./Loader";
import UserForm from "./UserForm";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserList() {
  const { users, isLoading, deleteUser } = useUserContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (userId: number) => {
    setIsModelOpen(true);
    setUserId(userId);
  };

  const userColumns: Array<{ header: string; accessor: keyof User }> = [
    { header: "Id", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader size={80} />
        </div>
      ) : (
        <div>
          <div className="">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 rounded outline-none w-full py-3 px-6 border border-teal-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table
            columns={userColumns}
            data={filteredUsers}
            actions={(user) => (
              <div className="flex justify-center items-center gap-4">
                <div
                  onClick={() => handleEdit(user)}
                  className="w-8 h-8 bg-black rounded-full flex justify-center items-center text-white cursor-pointer"
                >
                  <MdEditNote size={22} />
                </div>
                <div
                  onClick={() => handleDelete(user.id)}
                  className="w-8 h-8 bg-red-600 rounded-full flex justify-center items-center text-white cursor-pointer"
                >
                  <MdDelete size={22} />
                </div>
              </div>
            )}
          />
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <UserForm
              onClose={() => {
                setIsFormOpen(false);
                setSelectedUser(null); // Clear selected user
              }}
              user={selectedUser} // Pass the user to edit
              //   onUpdate={handleUpdate} // Pass update handler
            />
          </div>
        </div>
      )}

      {/* confirmation model for delte  */}
      {isModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete ?</p>
            <div className="flex mt-4">
              <button
                className="mr-2 p-2 bg-gray-300 rounded w-full"
                onClick={() => {
                  setIsModelOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded w-full"
                onClick={() => {
                  deleteUser(userId as number);
                  setIsModelOpen(false);
                  toast.success("Delete Successfully.");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
