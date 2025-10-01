import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ProfileCard from "./ProfileCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const email = user?.emailId;
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      let res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, about, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      {successMessage && (
        <div className="max-w-7xl mx-auto mb-6 bg-green-600 text-white py-3 px-4 rounded-lg shadow-lg font-semibold text-center animate-pulse">
          ✅ {successMessage}
        </div>
      )}
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your personal information and preview your profile</p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 items-start">
        {/* Edit Form - Left Side */}
        <div className="flex-1 w-full xl:max-w-2xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 sticky top-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <p className="text-gray-500 mt-2">Update your personal information</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    readOnly
                    className="w-full p-4 rounded-xl bg-gray-100 text-gray-600 border border-gray-300 focus:outline-none cursor-not-allowed pr-12 font-medium"
                  />
                  <div className="absolute right-4 top-4 text-gray-500 text-lg">
                    🔒
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
              </div>

              {/* Personal Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Paste your photo URL here"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  About Yourself
                </label>
                <textarea
                  name="about"
                  placeholder="Tell us something about yourself..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition resize-none"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
              >
                💾 Save Profile Changes
              </button>
            </form>
          </div>
        </div>

        {/* Profile Preview - Right Side */}
        <div className="w-full xl:w-96">
          <div className="sticky top-8">
           
            <ProfileCard
              user={{ 
                firstName, 
                lastName, 
                age, 
                photoUrl: photoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                about, 
                gender,
                emailId: email 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;