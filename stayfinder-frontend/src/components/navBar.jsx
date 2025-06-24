import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { debounce } from "./debounce";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser, listings, setListings } = useAuth();
  const [dummyListings, setDummyListings] = useState([]);

 useEffect(() => {
   if (listings && dummyListings.length === 0) {
     setDummyListings(listings);
   }
 }, [listings]);

  const debouncedSearch = debounce(handleSearch, 300);

  function handleHost() {
    if (!user) {
      toast.warning("Login first with host id");
      setTimeout(() => {
        navigate("/login", { replace: true, state: { from: "/host" } });
      });
      setMenuOpen(false);
    } else if (user.role !== "host") {
      toast.warning("Login first with host id");
      setTimeout(() => {
        navigate("/login", { replace: true, state: { from: "/host" } });
      });
      setMenuOpen(false);
    } else {
      navigate("/host");
      setMenuOpen(false);
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch(
        "https://airbnbclone-y56h.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Logout failed");
        throw new Error(errorData.error);
      }
      const result = await res.json();
      toast.success("logout successfully");
      setMenuOpen(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleSearch(e) {
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
      setListings(dummyListings);
    } else {
      const updatedListings = dummyListings.filter((l) =>
        l.location?.toLowerCase().includes(value.toLowerCase())
      );
      setListings(updatedListings);
    }
  }

  const hideNav = ["/register", "/login", "/wishlist"].includes(
    location.pathname
  );
  const showHostNav =
    location.pathname === "/host" || location.pathname.startsWith("/host/");

  return (
    <>
      {!hideNav ? (
        <div>
          <div className="px-6 md:hidden bg-[#FFFFFF] py-3 w-full flex flex-col">
            <div>
              {!location.pathname === "/profile" ? (
                <input
                  onChange={debouncedSearch}
                  type="text"
                  className="w-full bg-white text-center py-4 rounded-full outline-none shadow-md font-medium placeholder:text-black"
                  placeholder="Start Your search"
                />
              ) : (
                ""
              )}
            </div>
            {!showHostNav ? (
              <Link
                to={"/"}
                className="flex gap-2 justify-center items-center py-2 pt-5 px-1"
              >
                <FaHome className="text-3xl"></FaHome>
                <p className="font-bold">Homes</p>
              </Link>
            ) : (
              <div className="flex justify-center py-2 pt-5 gap-5">
                <div className="hover:bg-gray-200  rounded-lg px-4 flex items-center">
                  <NavLink
                    to="/host"
                    end
                    className={({ isActive }) =>
                      isActive ? "text-black border-b font-bold" : ""
                    }
                  >
                    Listings
                  </NavLink>
                </div>
                <div className="hover:bg-gray-200 rounded-lg px-4 flex items-center">
                  <NavLink
                    to="/host/listhome"
                    className={({ isActive }) =>
                      isActive ? "text-black border-b font-bold" : ""
                    }
                  >
                    List Home
                  </NavLink>
                </div>
                <div className="hover:bg-gray-200 rounded-lg px-4 flex items-center">
                  <NavLink
                    to="/host/bookings"
                    className={({ isActive }) =>
                      isActive ? "text-black border-b font-bold" : ""
                    }
                  >
                    Booking
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="hidden  shadow-sm md:flex md:justify-between px-10 py-5">
        <Link
          to={"/"}
          className="w-10 cursor-pointer flex items-center gap-1 text-[#FF385C] font-bold"
        >
          <img
            className="bg-white"
            src="data:image/png;base64,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"
            alt=""
          />
          <p className="text-2xl ">stayFinder</p>
        </Link>
        {!showHostNav ? (
          <Link
            to={"/"}
            className="flex gap-2 w-full justify-center items-center px-1"
          >
            <input
              type="text"
              onChange={debouncedSearch}
              placeholder="Enter Location...."
              className="border-2 ml-10 outline-none w-[40%] px-5 border-[#FF385C] py-1 rounded-full"
            />
          </Link>
        ) : (
          <div className="flex gap-5">
            <div className="hover:bg-gray-200  rounded-lg px-4 flex items-center">
              <NavLink
                to="/host"
                end
                className={({ isActive }) =>
                  isActive ? "text-black border-b font-bold" : ""
                }
              >
                Listings
              </NavLink>
            </div>
            <div className="hover:bg-gray-200 rounded-lg px-4 flex items-center">
              <NavLink
                to="/host/listhome"
                className={({ isActive }) =>
                  isActive ? "text-black border-b font-bold" : ""
                }
              >
                List Home
              </NavLink>
            </div>
            <div className="hover:bg-gray-200 rounded-lg px-4 flex items-center">
              <NavLink
                to="/host/bookings"
                className={({ isActive }) =>
                  isActive ? "text-black border-b font-bold" : ""
                }
              >
                Booking
              </NavLink>
            </div>
          </div>
        )}
        <div className="flex justify-center text-2xl gap-3 items-center">
          <div className="bg-gray-200 p-2 rounded-full">
            <CiGlobe></CiGlobe>
          </div>
          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex cursor-pointer justify-end p-2 rounded-full bg-gray-200"
            >
              <button>
                <IoIosMenu className="cursor-pointer" size={24} />
              </button>
            </div>

            {menuOpen && (
              <div className=" z-10 fixed transform duration-300 right-4 top-16 bg-white shadow-lg rounded-xl w-64 p-4 text-base">
                <div className="border-b flex items-center gap-1 pb-1">
                  <IoIosHelpCircleOutline className="text-xl tect-gray-500 font-bold" />
                  <p className="">Help Centre</p>
                </div>
                {user && (
                  <Link
                    to={"/profile"}
                    onClick={() => setMenuOpen(false)}
                    className="border-b flex cursor-pointer  items-center gap-1 py-2 w-full"
                  >
                    <CgProfile className="text-xl tect-gray-500" /> Profile
                  </Link>
                )}
                <div
                  onClick={handleHost}
                  className="border-b cursor-pointer py-2"
                >
                  <p className="">Host Your Home</p>
                  <p className="text-sm text-gray-600">
                    It’s easy to start hosting and earn extra income.
                  </p>
                </div>
                <div className="pt-2">
                  {!user ? (
                    <Link
                      to={"/register"}
                      onClick={() => setMenuOpen(false)}
                      className=""
                    >
                      Log in or sign up
                    </Link>
                  ) : (
                    <div onClick={handleLogout}>
                      <p className="text-red-500 font-bold cursor-pointer">
                        Logout
                      </p>{" "}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
