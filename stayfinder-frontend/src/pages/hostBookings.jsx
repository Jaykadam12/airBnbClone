import { useEffect, useState } from "react";

function HostBookings() {
  const [bookings, setBookings] = useState(undefined);
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHostBookings = async () => {
      try {
        const res = await fetch(
          "https://airbnbclone-y56h.onrender.com/api/bookings/host/bookings",
          {
            method: "GET",
            credentials: "include", // ✅ Important!
          }
        );
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch host bookings", err);
      }finally{
        setLoading(false)
      }
    };
    fetchHostBookings();
  }, []);

  if(Loading){
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Bookings for Your Listings
      </h2>

      {bookings?.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                    <strong>User:</strong>{booking.user?.email || "Unknown User"}
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    ₹{booking.totalPrice}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mt-1">
                  {booking.listing?.title || "Untitled Listing"}
                </h3>
                <p className="text-sm text-gray-500">
                  {booking.listing?.location || "Unknown location"}
                </p>

                <div className="text-sm text-gray-700 mt-4 space-y-1">
                  <p>
                    <strong>Check-In:</strong>{" "}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-Out:</strong>{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HostBookings;
