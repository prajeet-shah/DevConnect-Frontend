import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log(res.data.data);
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length <= 0) return <h1>No Connections found</h1>;

  return (
    <div>
      <h1 className="flex justify-center my-10 font-bold text-3xl">
        Connections
      </h1>
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connections={connection} />
      ))}
    </div>
  );
};

export default Connections;
