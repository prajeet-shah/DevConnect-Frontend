import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const getProfile = async () => {
    try {
      let res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res.data);
      setUserData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <div>{userData && <EditProfile user={userData} />}</div>;
};

export default Profile;
