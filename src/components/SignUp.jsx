import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      let res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.user);
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              FirstName
            </label>
            <input
              type="text"
              name="name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              lastName
            </label>
            <input
              type="text"
              name="name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <Link to={"/login"}>
            <p className="mt-4 ml-2">Already have a Account ? <span className="text-blue-600 underline">click here</span> </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
