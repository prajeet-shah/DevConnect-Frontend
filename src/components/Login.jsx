import axios from "axios";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      setTimeout(() => setError(""), 5000); // auto clear after 5s
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue your journey
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative group">
            <FaUser className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Remember me + Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember me</span>
            </label>
            <Link
              to={"/forgetpassword"}
              className="text-blue-500 hover:underline hover:text-blue-700 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button with loading state */}
          <button
            type="submit"
            disabled={loading || !emailId || !password}
            className={`w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-2 rounded-md transition duration-200 ${
              loading || !emailId || !password
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-500 hover:underline hover:text-blue-700 transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
