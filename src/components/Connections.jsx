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
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length <= 0)
    return <h1 className="text-center mt-10 text-xl">No Connections found</h1>;

  return (
    <div className="px-4">
      <h1 className="text-center my-8 text-3xl font-bold">Connections</h1>
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connections={connection} />
      ))}
    </div>
  );
};

export default Connections;
