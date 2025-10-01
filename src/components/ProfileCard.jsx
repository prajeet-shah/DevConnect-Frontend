import React from "react";

const ProfileCard = ({ user }) => {
  const { firstName, lastName, about, gender, age, photoUrl, emailId } = user;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
      {/* Profile Header */}
      <div className="p-8 text-center">
        <div className="relative inline-block">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
            src={
              photoUrl ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt="Profile"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <p className="text-gray-600 mb-2">
              {age && `${age} years`}
              {age && gender && " • "}
              {gender && `${gender}`}
            </p>
          )}

          {emailId && <p className="text-blue-600 text-sm mb-4">{emailId}</p>}
        </div>

        {/* About Section */}
        {about && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">ABOUT</h3>
            <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
              {about}
            </p>
          </div>
        )}

        {/* Profile Stats */}
      </div>
    </div>
  );
};

export default ProfileCard;
