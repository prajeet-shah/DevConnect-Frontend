import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
