import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  // console.log("re-render body");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchProfile = async () => {
    try {
      let res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));

      // Navigate to /feed ONLY if on homepage or login/signup
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/feed");
      }
      // console.log(res);
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(removeUser());
        navigate("/login");
        console.log(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    !user && fetchProfile();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
