import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Set base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
axios.defaults.headers.post["Content-Type"] = "application/json";

// Create App context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || '$';

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // ✅ fixed
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Helper function to get user-friendly error message
  const getErrorMessage = (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || !error.response) {
      return 'Cannot connect to server. Please make sure the server is running on port 3000.';
    }
    return error.response?.data?.message || error.message || 'An error occurred';
  };

  // Fetch user data
  const fetchUser = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner"); // ✅ correct
      } else {
        navigate("/");
      }
    } catch (error) {
      // Don't show error toast for network errors on user fetch (server might be down)
      if (error.code !== 'ERR_NETWORK' && error.response) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = ``;
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Load token from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    fetchCars();
  }, []);

  // React to token changes: keep axios header and user in sync
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner, // ✅ export correctly
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
