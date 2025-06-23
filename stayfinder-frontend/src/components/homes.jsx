import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { toast } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";
import Loading from '../components/Loading'


function Homes() {
  const location = useLocation();
  const {
    user,
    fetchUser,
    setListings,
    listings,
    listLoading,
    fetchHostListings,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);


async function handleDelete(homeId) {
  try {
    const res = await fetch(
      `https://airbnbclone-y56h.onrender.com/api/listings/${homeId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to delete home");
    }

    toast.success("Your home was deleted");
    fetchHostListings();
  } catch (error) {
    console.error("Error deleting home:", error.message);
    toast.error("Failed to delete home");
  }
}

  if(listLoading){
    return <Loading></Loading>
  }

  if(listings === undefined){
    return <p>Listings Not Found</p>
  }
  return listings ? (
    <div className="">
      <p className="text-2xl font-bold mb-5">Popular homes</p>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((home, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-md border hover:shadow- hover:shadow-black hover:transition-all hover:scale-95 hover:duration-200 bg-white"
          >
            <div className="relative h-64">
              <img
                src={`${home.images[0]}`}
                alt="listing"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                Guest favourite
              </span>
              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <CiHeart size={18} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {home.title}
              </h2>
              <div className="text-base flex items-center gap-2 font-semibold text-gray-900 truncate">
                <FaLocationDot /> <p>{home.location}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                ₹{home.price?.toLocaleString()} for 1 nights
              </p>
            </div>
            <div className="px-4 pb-3 flex justify-around">
              <Link
                to={`/singleHome/${home._id}`}
                className="px-5 py-1 rounded-lg bg-green-600 text-white "
              >
                Details
              </Link>
              {location.pathname === "/host" && (
                <>
                  <Link
                    to={{
                      pathname: "/host/listhome",
                      search: `?editing=true&homeId=${home._id}`,
                    }}
                    className="px-5 py-1 rounded-lg bg-blue-600 text-white "
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(home._id)}
                    className="px-5 py-1 cursor-pointer rounded-lg bg-red-600 text-white "
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
export default Homes;
