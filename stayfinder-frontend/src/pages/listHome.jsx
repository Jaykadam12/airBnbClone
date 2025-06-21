import { Link, useLocation } from "react-router-dom";
import BottomNav from "../components/bottomNav";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function ListHome() {
  const [home, setHome] = useState(undefined);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const editing = queryParams.get("editing"); // returns a string, e.g., "true"
  const homeId = queryParams.get("homeId");

  async function fetchListings() {
    const res = await fetch(`/api/listings/${homeId}`);
    const data = await res.json();
    setHome(data);
  }

  useEffect(() => {
    if (editing && homeId) {
      fetchListings();
    }
  }, [])
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("price", form.price.value);
    formData.append("location", form.location.value);
    formData.append("features", form.features.value);

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/listings/${homeId}` : "/api/listings";

      const response = await fetch(url, {
        method,
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      form.reset();
      toast.success('Home listed')
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleFileChange(e) {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }

  return !editing ? (
    <div className="md:border md:border-gray-500 md:mx-[20vw] lg:mx-[30vw] md:my-20 md:rounded-2xl ">
      <div className="flex shadow font-medium justify-center pt-5 pb-3 text-lg">
        List Your Home Here
      </div>
      <div className="px-8 py-5">
        <p className="text-2xl font-medium mb-3">Welcome to Airbnb</p>
        <form onSubmit={handleSubmit} className=" mt-5  " action="#!">
          <div className=" border border-gray-500 rounded-lg">
            <input
              className="w-full border-b border-gray-500 py-2.5 px-5"
              type="text"
              name="title"
              id="title"
              placeholder="Enter home title"
            />
            <textarea
              className="w-full py-2.5 px-5 border-b border-gray-500"
              type="text"
              name="description"
              id="description"
              placeholder="Enter details full of your home"
              rows={3}
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="price"
              id="price"
              placeholder="Enter price per day"
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="location"
              id="location"
              placeholder="Enter location"
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="features"
              id="features"
              placeholder="Enter facilities you provide sepeared by space"
            />
            <div>
              <input
                className="w-full py-2.5 px-5 "
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {selectedFiles.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <img
                      className="w-full  px-5 "
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onLoad={() => URL.revokeObjectURL(url)} // Clean up memory
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button className="w-full bg-[#DC0D64] text-white capitalize text-lg my-5 py-2 font-bold rounded-lg">
            Submit
          </button>
        </form>
      </div>
      <BottomNav></BottomNav>
    </div>
  ) : home ? (
    <div className="md:border md:border-gray-500 md:mx-[20vw] lg:mx-[30vw] md:my-20 md:rounded-2xl ">
      <div className="flex shadow font-medium justify-center pt-5 pb-3 text-lg">
        Edit Your Home Here
      </div>
      <div className="px-8 py-5">
        <p className="text-2xl font-medium mb-3">Welcome to Airbnb</p>
        <form onSubmit={handleSubmit} className=" mt-5  " action="#!">
          <div className=" border border-gray-500 rounded-lg">
            <input
              className="w-full border-b border-gray-500 py-2.5 px-5"
              type="text"
              name="title"
              id="title"
              defaultValue={home.title}
              placeholder="Enter home title"
            />
            <textarea
              className="w-full py-2.5 px-5 border-b border-gray-500"
              type="text"
              name="description"
              id="description"
              defaultValue={home.description}
              placeholder="Enter details full of your home"
              rows={3}
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="price"
              id="price"
              defaultValue={home.price}
              placeholder="Enter price per day"
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="location"
              id="location"
              defaultValue={home.location}
              placeholder="Enter location"
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="text"
              name="features"
              id="features"
              defaultValue={home.features}
              placeholder="Enter facilities you provide sepeared by space"
            />
            <div>
              <input
                className="w-full py-2.5 px-5 "
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {selectedFiles.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <img
                      className="w-full  px-5 "
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onLoad={() => URL.revokeObjectURL(url)} // Clean up memory
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button className="w-full bg-[#DC0D64] text-white capitalize text-lg my-5 py-2 font-bold rounded-lg">
            Edit
          </button>
        </form>
      </div>
      <BottomNav></BottomNav>
    </div>
  ) : (
   <Loading></Loading>
  );

}
export default ListHome;
