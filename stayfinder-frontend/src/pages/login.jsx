import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../components/bottomNav";
import { toast } from "react-toastify";
import { useAuth } from "../context";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
      const res = await fetch("https://airbnbclone-y56h.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Registration failed");
        throw new Error("failed to register");
      }
      toast.success("login successfull");
      const result = await res.json();
      fetchUser();
      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="md:border md:border-gray-500 md:mx-[20vw] lg:mx-[30vw] md:my-20 md:rounded-2xl ">
      <div className="flex shadow font-medium justify-center pt-5 pb-3 text-lg">
        {from === '/host' ? "Login with host email" : "log in"}
      </div>
      <div className="px-8 py-10">
        <p className="text-2xl font-medium mb-3">Welcome to Airbnb</p>
        <form onSubmit={handleSubmit} className=" mt-5  " action="#!">
          <div className=" border border-gray-500 rounded-lg">
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
          </div>
          <p className="mt-2 text-sm text-gray-700">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button className="w-full cursor-pointer bg-[#DC0D64] text-white capitalize text-lg my-5 py-2 font-bold rounded-lg">
            Login
          </button>
          <p>
            Don't have account yet,{" "}
            <Link className="underline" to={"/register"}>
              Register.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
