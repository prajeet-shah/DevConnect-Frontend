import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();

  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      let res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      console.log(res.data.users);
      dispatch(addFeed(res?.data?.users));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!feedData || feedData.length === 0) {
      getFeed();
    }
  }, [feedData]);

  if (!feedData) return;
  if (feedData <= 0) return <h1> no user found in the feed</h1>;

  return (
    <div className="">
      <div className="flex justify-center my-10">
        {feedData && <UserCard user={feedData[0]} />}
      </div>
    </div>
  );
};

export default Feed;
