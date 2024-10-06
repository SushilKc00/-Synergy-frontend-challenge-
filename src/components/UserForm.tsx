import { useForm } from "react-hook-form"; // Use react-hook-form for form handling
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormProps } from "../types/type";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify"; // Import toast
import { useEffect } from "react";
import axios from "axios";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone Number Required")
    .min(10, "Invalid Phone Number")
    .max(10, "Phone Number Incorrect"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
  }),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  company: z.object({
    name: z.string().min(3, "Company name must be at least 3 characters long"),
  }),
  website: z
    .string()
    .refine(
      (value) =>
        // Check if the input starts with "http://", "https://", or is a valid domain (without a scheme)
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value),
      {
        message: "Website must be a valid URL or domain",
      }
    )
    .transform((value) => {
      // If the value doesn't start with http:// or https://, prepend https:// to it
      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        return `https://${value}`;
      }
      return value;
    }),
});

type UserForm = z.infer<typeof userSchema>;

export default function UserForm({ onClose, user }: UserFormProps) {
  console.log(user);
  const { addUser, setIsLoading, updateUser, users } = useUserContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  // create a new user on submit
  const onSubmit = async (data: UserForm) => {
    setIsLoading(true);
    addUser({
      ...data,
      id: users.length + 1,
    });
    setIsLoading(false); // Call the success callback with new user data
    onClose(); // Close the form modal
    toast.success("User created successfully!");
  };

  // update the user
  const handleUpdate = async (data: UserForm) => {
    if ((user?.id as number) < 10) {
      const { data: updateUserData } = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${user?.id}`,
        data
      );
      updateUser(updateUserData);
    } else {
      updateUser({
        ...data,
        id: user?.id as number,
      });
    }
    setIsLoading(false); // Call the success callback with new user data
    onClose(); // Close the form modal
    toast.success("Update successfully!");
  };

  // handlechange for usernamae dynamiclly change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setValue("name", newName); // Update the name field
    if (!isUpdateMode) {
      const generatedUsername =
        "User-" + newName.toUpperCase().replace(/\s+/g, "-");
      setValue("username", generatedUsername); // Update the username field in create mode
    }
  };

  // check is update mode or not
  const isUpdateMode = Boolean(user);

  useEffect(() => {
    if (isUpdateMode && user) {
      // Populate form fields with user data when editing
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        company: {
          name: user?.company?.name,
        },
        address: { street: user.address?.street, city: user.address?.city },
        website: user.website,
      });
    }
  }, [user, isUpdateMode, reset]);

  return (
    <div className="min-w-[60vw]">
      <form
        onSubmit={handleSubmit(user ? handleUpdate : onSubmit)}
        className="w-full space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">
          {user ? "Update User" : "Create New User"}
        </h2>

        {/* Form fields */}

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 text-gray-700">Name*</label>
            <input
              {...register("name")}
              onChange={handleNameChange}
              className="border rounded p-2 w-full"
              defaultValue={user?.name || ""}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-1 text-gray-700">Email*</label>
            <input
              {...register("email")}
              className="border rounded p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 text-gray-700">Phone*</label>
            <input
              {...register("phone")}
              className="border rounded p-2 w-full"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-1 text-gray-700">Username*</label>
            <input
              {...register("username")}
              readOnly
              className="border rounded p-2 w-full"
            />
            {/* {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )} */}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 text-gray-700">Street</label>
            <input
              {...register("address.street")}
              className="border rounded p-2 w-full"
            />
            {errors.address?.street && (
              <p className="text-red-500">{errors.address.street.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-1 text-gray-700">City</label>
            <input
              {...register("address.city")}
              className="border rounded p-2 w-full"
            />
            {errors.address?.city && (
              <p className="text-red-500">{errors.address.city.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Company</label>
          <input
            {...register("company.name")}
            className="border rounded p-2 w-full"
          />
          {errors.company && (
            <p className="text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Website</label>
          <input
            {...register("website")}
            className="border rounded p-2 w-full"
          />
          {errors.website && (
            <p className="text-red-500">{errors.website.message}</p>
          )}
        </div>

        {/* Submit and Cancel buttons */}
        <div className="space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
