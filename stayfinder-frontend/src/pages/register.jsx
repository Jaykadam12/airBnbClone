import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../components/bottomNav";
import { toast } from "react-toastify";

function RegisterPage() { 
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
      try {
        const res = await fetch("https://airbnbclone-y56h.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if(!res.ok){
          const errorData = await res.json();
          toast.error(errorData.error || "Registration failed");
          throw new Error('failed to register');
        }
        toast.success('user registered')
        const result = await res.json();
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        console.log(result);
      } catch (error) {
        console.error("Registration failed:", error);
      }

  }

  return (
    <div className="md:border md:border-gray-500 md:mx-[20vw] lg:mx-[30vw] md:my-20 md:rounded-2xl ">
      <div className="flex shadow font-medium justify-center pt-5 pb-3 text-lg">
        Sign up
      </div>
      <div className="px-8 py-10">
        <p className="text-2xl font-medium mb-3">Welcome to Airbnb</p>
        <form onSubmit={handleSubmit} className=" mt-5  " action="#!">
          <div className=" border border-gray-500 rounded-lg">
            <input
              className="w-full border-b border-gray-500 py-2.5 px-5"
              type="number"
              name="number"
              id="number"
              placeholder="Phone Number"
            />
            <input
              className="w-full py-2.5 px-5 border-b border-gray-500"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <input
              className="w-full py-2.5 px-5 border-b"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <select name="role" id="role" className="w-full py-2.5 px-5">
              <option disabled selected>
                Select
              </option>
              <option value="user">User</option>
              <option value="host">Host</option>
            </select>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button className="w-full bg-[#DC0D64] text-white capitalize text-lg my-5 py-2 font-bold rounded-lg">
            Rigester
          </button>
          <p>
            already register,{" "}
            <Link className="underline" to={"/login"}>
              Login.
            </Link>
          </p>
        </form>
      </div>
      <BottomNav></BottomNav>
    </div>
  );
}
export default RegisterPage;
