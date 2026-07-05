import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}