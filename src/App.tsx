import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Router>
      {/* Header component */}
      <Header />
      {/* All pages routes here  */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-details/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
