import { Navigate, Route, Routes } from "react-router";
import { UsersPage } from "./features/users/pages/users";
import { UserDetailsPage } from "./features/users/pages/user-details";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/users" replace />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/users/:id" element={<UserDetailsPage />} />
    <Route path="*" element={<Navigate to="/users" replace />} />
  </Routes>
);
