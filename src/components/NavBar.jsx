import { useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout logic
  const handleLogout = async () => {
    try {
      let res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // console.log(user);
  return (
    <div className="navbar bg-secondary shadow-md">
      <div className="flex-1">
        <Link to={user ? "/feed" : "/login"} className="btn btn-ghost text-xl">
          DevConnect
        </Link>
      </div>
      {user ? (
        <div className="flex">
          <div className="font-bold mx-2 text-xl ">
            welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
