import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [listings, setListings] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
     const res = await fetch("https://airbnbclone-y56h.onrender.com/api/auth/me", {
       method: "GET",
       credentials: "include",
     });

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

    async function fetchListings() {
      let api = "https://airbnbclone-y56h.onrender.com/api/listings";

      if (location.pathname === "/host"){
        api = `https://airbnbclone-y56h.onrender.com/api/listings/host/${user._id}`;
      }

      try {
        const res = await fetch(api);

        if (!res.ok) {
          const errordata = await res.json();
          throw new Error(errordata.error);
        }
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to load listings", err);
      }
    }
      useEffect(() => {
        fetchListings();
      }, [user, location.pathname]);

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
        fetchListings,
        listings,
        setListings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
