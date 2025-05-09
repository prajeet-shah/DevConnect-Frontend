import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/requestSlice";

const RequestCard = ({ requests }) => {
  const dispatch = useDispatch();
  const { _id } = requests;
  const { firstName, lastName, photoUrl, about } = requests.fromUserId;

  const handleRequest = async (status, requestId) => {
    let res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + requestId,
      {},
      { withCredentials: true }
    );
    console.log(res.data);
    dispatch(removeRequests(requestId));
  };

  return (
    <div className="w-[95%] md:w-3/4 lg:w-1/2 mx-auto my-3 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={photoUrl}
          alt="User"
        />

        <div className="flex-1 text-center md:text-left text-black">
          <h1 className="text-xl font-semibold">
            {firstName + " " + lastName}
          </h1>
          <p className="text-gray-700">{about}</p>
        </div>

        <div className="flex gap-3">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={() => handleRequest("accepted", _id)}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => handleRequest("rejected", _id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
