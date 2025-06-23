import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [listings, setListings] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoadings] = useState(true);

  async function fetchUser() {
    try {
     const res = await fetch(
       "https://airbnbclone-y56h.onrender.com/api/auth/me",
       {
         method: "GET",
         credentials: "include",
       }
     );

      if (!res.ok) {
        // Other errors
        setUser(undefined);
      }

      const data = await res.json();
      if (!data.error) {
        // No error, user data received
        setUser(data);
      } else {
        // There is an error, e.g. no token or unauthorized
        setUser(undefined);
      }
    } catch (err) {
      console.error("Auth fetch error:", err.message);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  }

async function fetchAllListings() {
  try {
    const res = await fetch(
      "https://airbnbclone-y56h.onrender.com/api/listings"
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const data = await res.json();
    setListings(data);
  } catch (error) {
    console.error("Failed to fetch all listings:", error.message);
    setListings(undefined);
  } finally {
    setListLoadings(false);
  }
}

async function fetchHostListings() {
  if (!user?._id) return; // wait for user to be ready
  try {
    const res = await fetch(
      `https://airbnbclone-y56h.onrender.com/api/listings/host/${user._id}`
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    const data = await res.json();
    setListings(data);
  } catch (error) {
    console.error("Failed to fetch host listings:", error.message);
    setListings(undefined);
  } finally {
    setListLoadings(false);
  }
}
  useEffect(() => {
    setListings(undefined); // clear old data immediately
    setListLoadings(true); // show loading spinner
    if (location.pathname === "/host") {
      fetchHostListings();
    } else {
      fetchAllListings();
    }
  }, [user?._id, location.pathname]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        listings,
        setListings,
        listLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
