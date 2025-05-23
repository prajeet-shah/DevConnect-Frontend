import React from "react";
import { Link } from "react-router";
const ConnectionCard = ({ connections }) => {
  const { _id, firstName, lastName, photoUrl, about } = connections;

  return (
    <div className="w-[95%] md:w-3/4 lg:w-1/2 mx-auto my-3 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={photoUrl}
          alt="User"
        />
        <div className="text-center md:text-left flex-1 text-black">
          <h1 className="text-xl font-semibold">
            {firstName + " " + lastName}
          </h1>
          <p className="text-gray-700">{about}</p>
        </div>
        <Link to={"/chat/" + _id}>
          <button className="btn btn-primary px-5 text-lg">Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
