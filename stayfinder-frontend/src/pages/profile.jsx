import BottomNav from "../components/bottomNav";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import About from "../components/about";
import UserBookings from "../components/userBookings";
import LoginComponent from "../components/loginComponent";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";


function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const {user, fetchUser, setUser} = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  // useEffect(() => {
  //   fetchUser();
  // },[])
    async function handleLogout() {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (!res.ok) {
          const errorData = await res.json();
          toast.error("Logout failed");
          throw new Error(errorData.error);
        }
        const result = await res.json();
        toast.success("logout successfully");
        setUser(null);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user === undefined) {
        setShowLogin(true);
      }
    }, 1000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, [user]);

  if (showLogin) {
    return <LoginComponent />;
  }


  const navItems = [
    { key: "about", label: "About me", icon: "J", path: "/profile" },
    { key: "bookings", label: "bookings", icon: "🧳", path: "/profile/bookings" },
  ];
  return user ? (
    <>
      <div className="hidden lg:flex min-h-screen border-t border-gray-200 px-32 bg-white">
        {/* Sidebar */}
        <div className="w-1/4 p-8 py-20 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
                activeTab === item.key
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                {typeof item.icon === "string" ? item.icon : item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        {/* Main Content */}
        {location.pathname === "/profile" && <About user={user}></About>}
        {location.pathname === "/profile/bookings" && (
          <UserBookings user={user}></UserBookings>
        )}
      </div>

      <div className="px-10 lg:hidden">
        <p className="text-3xl font-bold">Proflie</p>
      </div>
      <div className="flex flex-col items-center py-10">
        <div className="bg-white lg:hidden  rounded-3xl shadow-xl w-80 text-center">
          <div className="w-24 h-24 rounded-full bg-black text-white text-4xl font-bold flex items-center justify-center mx-auto mb-4">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-xl font-bold">{user.email}</h3>
          <p
            onClick={handleLogout}
            className="text-red-500 flex gap-1 justify-center items-center text-lg font-bold py-2"
          >
            Logout <IoIosLogOut />
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-10 lg:hidden">
        <UserBookings user={user}></UserBookings>
      </div>
    </>
  ) : (
    <Loading></Loading>
  ); 
}
export default ProfilePage;
