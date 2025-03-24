import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/requestSlice";

const RequestCard = ({ requests }) => {
  const dispatch = useDispatch();
  const { _id } = requests;
  const { firstName, lastName, photoUrl, about, age, gender } =
    requests.fromUserId;

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
    <div>
      <div className="flex justify-start items-center w-1/2 border border-blak rounded-lg bg-gray-200 mx-auto my-3 shadow-md">
        <img
          className="w-20 h-20 rounded-full mx-2 "
          src={photoUrl}
          alt="photoUrl"
        />
        <div className="w-1/2">
          <h1 className="text-2xl">{firstName + " " + lastName}</h1>
          <p className="text-xl">{about}</p>
        </div>
        <div className="flex justify-end w-1/3 mx-2">
          <button
            className="btn btn-primary mx-3"
            onClick={() => {
              handleRequest("accepted", _id);
            }}
          >
            Accepted
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleRequest("rejected", _id);
            }}
          >
            Rejected
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
