import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";import { IoHomeOutline } from "react-icons/io5";
import { toast } from "react-toastify";


function BottomNav() {
  const navigate = useNavigate()
  const {user} = useAuth();
    function handleHost() {
      if (!user) {
        toast.warning("Login first with host id");
        setTimeout(() => {
          navigate("/login", { replace: true, state: { from: "/host" } });
        });
      } else if (user.role !== "host") {
        toast.warning("Login first with host id");
        setTimeout(() => {
          navigate("/login", { replace: true, state: { from: "/host" } });
        });
        setMenuOpen(false);
      } else {
        navigate("/host");
      }
    }

  return (
    <div className="fixed flex gap-5 justify-center bottom-0 left-0 w-full bg-white shadow-md md:hidden z-50">
      <Link to={"/"} className="flex flex-col items-center justify-around p-3">
        <CiSearch className="text-2xl"></CiSearch>
        <button className="text-gray-700">Explore</button>
      </Link>
      {!user ? (
        <Link
          to={"/register"}
          className="flex flex-col items-center justify-around p-3"
        >
          <FaRegUserCircle className="text-gray-600 text-lg" />
          <button className="text-gray-700">Log in</button>
        </Link>
      ) : (
        <Link
          to={"/profile"}
          className="flex flex-col items-center justify-around p-3"
        >
          <FaRegUserCircle className="text-gray-600 text-lg" />
          <button className="text-gray-700">Profile</button>
        </Link>
      )}
      <div
        onClick={handleHost}
        className="flex flex-col items-center justify-around p-3"
      >
        <IoHomeOutline className="text-gray-600 text-lg" />
        <button className="text-gray-700">Host Home</button>
      </div>
    </div>
  );
}
export default BottomNav;
