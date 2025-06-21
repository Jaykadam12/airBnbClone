import { useEffect, useState } from "react";
import Loading from "./Loading";

function UserBookings({ user }) {
  const [bookings, setBookings] = useState(undefined);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://airbnbclone-y56h.onrender.com/api/bookings/${user._id}`);
        const data = await res.json();
        setBookings(data);

        const uniqueListingIds = [...new Set(data.map((b) => b.listing))];

        const listingResponses = await Promise.all(
          uniqueListingIds.map((id) =>
            fetch(`https://airbnbclone-y56h.onrender.com/api/listings/${id}`).then((res) => res.json())
          )
        );

        setListings(listingResponses);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Loading></Loading>
      </div>
    );

  if (!bookings || bookings.length === 0)
    return <div className="text-center text-lg mt-10">No bookings found.</div>;

  return (
    <div className="flex-1 px-8 py-16 lg:border-l lg:border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Past Bookings
      </h2>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {bookings.map((booking, index) => {
          const listing = listings.find((l) => l._id === booking.listing);

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white"
            >
              {/* Listing Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={
                    listing?.images?.[0]
                      ? `http://localhost:5000${listing.images[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={listing?.title || "Listing"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Booking Info */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                    {listing?.title || "Untitled Listing"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {listing?.location || "Unknown location"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Booked by:</span>{" "}
                    {user?.email || "N/A"}
                  </p>
                </div>

                <div className="space-y-1 text-sm text-gray-600 mt-auto">
                  <p>
                    <span className="font-medium">Check-In:</span>{" "}
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Check-Out:</span>{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Total Price:</span> ₹
                    {booking.totalPrice || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserBookings;
