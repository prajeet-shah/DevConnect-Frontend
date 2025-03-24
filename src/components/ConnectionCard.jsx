import React from "react";
import { useSelector } from "react-redux";

const ConnectionCard = ({ connections }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = connections;
  return (
    <div>
    
    
      <div className="flex justify-start items-center w-1/2 border border-blak rounded-lg bg-gray-200 mx-auto my-3 shadow-md">
        <img
          className="w-20 h-20 rounded-full mx-2 "
          src={photoUrl}
          alt="photoUrl"
        />
        <div>
          <h1 className="text-2xl">{firstName + " " + lastName}</h1>
          <p className="text-xl">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
