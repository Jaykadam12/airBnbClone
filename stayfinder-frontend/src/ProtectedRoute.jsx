import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, fetchUser } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setLoading(false);
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== "host") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
