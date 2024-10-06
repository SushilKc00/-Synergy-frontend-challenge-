import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="bg-slate-200 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <Link to={"/"} className="font-bold text-xl text-teal-600">
            User Mangement
          </Link>
        </div>
        <div
          className="cursor-pointer flex items-center gap-2 bg-gray-300 px-4 py-2 rounded-sm shadow-xl"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          <FaPlus />
          <h2>create</h2>
        </div>
      </nav>

      {/* Modal for User Form */}
      {isModalOpen && (
        <div className="fixed top-0 w-full h-screen flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded shadow-lg">
            {/* Close button for closing the modal  */}
            <div
              className="flex justify-end text-xl font-bold cursor-pointer"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <span>X</span>
            </div>

            {/* User Form  */}
            <UserForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
