import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);

  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      let res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      console.log(res.data.data);

      setSuccessMessage("Profile updated successfully");

      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="text-center bg-green-600 text-white py-2 font-semibold">
          {successMessage}
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Edit Profile
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />
            <textarea
              name="about"
              placeholder="About Yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
        <div className="mx-2 hidden">
          <UserCard
            user={{ firstName, lastName, age, photoUrl, about, gender }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
