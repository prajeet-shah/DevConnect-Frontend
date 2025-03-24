import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const fetchRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    console.log(res.data[1].data);
    dispatch(addRequests(res.data[1].data));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length <= 0) return <h1>No Requests found</h1>;
  return (
    <div>
      <h1 className="flex justify-center my-10 font-bold text-3xl">Requests</h1>

      {requests.map((request) => (
        <RequestCard key={request._id} requests={request} />
      ))}
    </div>
  );
};

export default Requests;
