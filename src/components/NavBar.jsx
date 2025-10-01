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
      <div className="flex">
        <Link to={user ? "/feed" : "/login"} className="btn btn-ghost text-xl">
          DevConnect
        </Link>
      </div>
      {user && (
        <div className="flex-1 mx-7">
          <nav>
            <ul className="flex ">
              <Link to={"/feed"}>
                <li className="ml-36 mr-10 text-xl font-semibold">Home</li>
              </Link>
              <Link to={"/connections"}>
                <li className="mx-10 text-xl font-semibold">Connections</li>
              </Link>
              <Link to={"/requests"}>
                <li className="mx-10 text-xl font-semibold">Requests</li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
      {user ? (
        <div className="flex">
          <div className="font-bold mx-2 text-xl hidden md:block">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-1 md:w-52 w-36 p-2 shadow"
            >
              <li>
                <Link
                  to={"/profile"}
                  className="justify-between md:text-base text-sm"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"} className="md:text-base text-sm">
                  Connections
                </Link>
              </li>
              <li>
                <Link to={"/requests"} className="md:text-base text-sm">
                  Requests
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="md:text-base text-sm">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
