import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context";
import { toast } from "react-toastify";
import BottomNav from "../components/bottomNav";

function SingleHome() {
  const [home, setHome] = useState(undefined);
  const [showReserve, setShowReserve] = useState(false)
  const { id } = useParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const {user} = useAuth()

  async function fetchListings() {
    const res = await fetch(`https://airbnbclone-y56h.onrender.com/api/listings/${id}`);
    const data = await res.json();
    setHome(data);
  }

  function handleReserve() {
    if(user){
      if(showReserve){
        setShowReserve(false);
      }
      else{
        setShowReserve(true);
      }
    } else {
      toast.warning('Login First');
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

    function calculateTotal(checkInDate, checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      if (start >= end) {
        setTotalPrice(0);
        return;
      }

      const diffTime = end.getTime() - start.getTime();
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(nights * home.price);
    }

    function handleCheckInChange(e) {
      const value = e.target.value;
      setCheckIn(value);
      if (checkOut) calculateTotal(value, checkOut);
    }

    function handleCheckOutChange(e) {
      const value = e.target.value;
      setCheckOut(value);
      if (checkIn) calculateTotal(checkIn, value);
    }

    async function handleSubmit(home,user){
      try {
        const body = {
          user: user._id,
          listing: home._id,
          checkIn: checkIn,
          checkOut: checkOut,
          totalPrice: totalPrice
        }

        const res = await fetch("https://airbnbclone-y56h.onrender.com/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ← important
          },
          body: JSON.stringify(body),
        });
        if(!res.ok){
          const errorData = await res.json();
          toast.error("Failed to Booked");
          throw new Error('Failed to Booked')
        }

        const result = await res.json();
        setShowReserve(false);
        toast.success('Booking successfull');
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <div className="py-5 px-10  md:px-20 lg:px-32 xl:px-52">
      {home ? (
        <>
          <p className="text-2xl font-semibold my-2 mb-5">
            {home.title} in {home.location}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {home.images.map((image, index) => (
              <img
                key={index}
                className="rounded-lg h-52 w-92 object-cover shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                src={`https://airbnbclone-y56h.onrender.com${image}`}
                alt={`Home image ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
          <div>
            <p className="my-5">
              <span className="font-bold">About this place:</span>{" "}
              {home.description}
            </p>
          </div>
          <div>
            <p className="font-bold">What this place offers:</p>
            {home.features.map((feature, index) => (
              <p key={index} className="text-gray-700">
                • {feature}
              </p>
            ))}
          </div>
          <div className="py-5 capitalize flex justify-between">
            <div>
              <p className="text-lg font-bold">Rs {home.price}</p>
              <p>For 1 night</p>
            </div>
            <div>
              {showReserve && (
                <div
                  className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 ${
                    showReserve ? "flex" : "hidden"
                  }`}
                >
                  <div className="w-full max-w-md mx-4 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Book Your Stay
                      </h2>
                      <button
                        onClick={() => setShowReserve(false)}
                        className="text-gray-500 hover:text-gray-800 text-xl"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-600">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={handleCheckInChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm mb-1 text-gray-600">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={handleCheckOutChange}
                        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4 text-center font-medium text-gray-700">
                      {totalPrice > 0
                        ? `Total Price: ₹${totalPrice}`
                        : "Select valid dates"}
                    </div>

                    <button
                      onClick={() => handleSubmit(home, user)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleReserve}
                className="px-8 py-2 cursor-pointer bg-[#DC0E63] text-white rounded-full"
              >
                Reserve
              </button>
            </div>
          </div>
          {/* <BottomNav></BottomNav> */}
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}
export default SingleHome;
