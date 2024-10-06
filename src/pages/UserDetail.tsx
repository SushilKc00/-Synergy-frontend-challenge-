// src/pages/UserDetails.tsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext"; // Import your UserContext
import Loader from "../components/Loader";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>(); // Get user ID from URL parameters
  const { users, isLoading } = useUserContext();
  const userId = id ? parseInt(id) : null; // Access users and loading state from context
  const user = userId !== null ? users.find((u) => u.id === userId) : null; // Find the user by ID

  if (isLoading) {
    return <Loader size={80} />;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-4xl font-bold text-gray-400">
        User not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-teal-600">{user.name}</h1>

        {/* if user present then show details  */}
        {user && (
          <div>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Website:</strong>{" "}
              <a
                href={`https://${user.website}`}
                className="text-teal-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
            <h2 className="text-xl font-semibold mt-6">Address</h2>
            <p className="text-lg text-gray-700">
              {user?.address?.street}, {user?.address?.city},{" "}
              {user?.address?.zipcode}
            </p>
            <h2 className="text-xl font-semibold mt-6">Company</h2>
            <p className="text-lg text-gray-700">
              <strong>{user?.company?.name}</strong> -{" "}
              {user?.company?.catchPhrase}
            </p>
            <h2 className="text-xl font-semibold mt-6">About</h2>
            <p className="text-lg text-gray-700">{user?.company?.bs}</p>
          </div>
        )}

        <div className="mt-6">
          <Link to="/" className="text-teal-500 hover:underline">
            Back to Users List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
