import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/current", {
          withCredentials: true,
        });

        if (res.data?.success) {
          setAuthorized(true);
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  return authorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
