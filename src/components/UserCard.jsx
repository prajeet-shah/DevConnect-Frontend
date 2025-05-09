import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  console.log(user);

  const dispatch = useDispatch();
  const { _id, firstName, lastName, about, gender, age } = user;

  const fetchSendRequest = async (status, requestId) => {
    if (!user) return;
    let res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + requestId,
      {},
      { withCredentials: true }
    );

    dispatch(removeFeed(requestId));
    console.log(res.data);
  };

  // useEffect(() => {
  //   fetchSendRequest();
  // }, []);

  return (
    <div>
      <div className="card bg-base-300 w-full shadow-sm">
        <figure>
          <img className="w-full h-80" src={user.photoUrl} alt="photoUrl" />
        </figure>
        <div className="card-body">
          {<h2 className="card-title">{firstName + " " + lastName}</h2>}
          {age && gender && <h2 className="text-xl">{age + " , " + gender}</h2>}
          {about && <h2 className="card-title">{about}</h2>}

          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary text-xl mx-2"
              onClick={() => {
                fetchSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary text-xl mx-2"
              onClick={() => {
                fetchSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
