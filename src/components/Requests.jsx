import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data[1].data));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests || requests.length <= 0)
    return <h1 className="text-center mt-10 text-xl">No Requests found</h1>;

  return (
    <div className="px-4">
      <h1 className="text-center my-8 text-3xl font-bold">Requests</h1>
      {requests.map((request) => (
        <RequestCard key={request._id} requests={request} />
      ))}
    </div>
  );
};

export default Requests;
