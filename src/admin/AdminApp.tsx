import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ApplicationsPage from "./pages/ApplicationsPage";

export default function AdminApp() {
  return (
    <LangProvider>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="applications"
            element={
              <ProtectedRoute>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="applications" replace />} />
        </Routes>
      </AuthProvider>
    </LangProvider>
  );
}
