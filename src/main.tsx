import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ToastContainer />
    <App />
  </UserProvider>
);
