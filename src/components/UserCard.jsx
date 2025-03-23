import React from "react";

const UserCard = ({ user }) => {
  console.log(user);

  const { firstName, lastName, photoUrl, skills, about, gender } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img className="w-full" src={user.photoUrl} alt="photoUrl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {about && <h2 className="card-title">{about}</h2>}
         
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary text-xl mx-2">Ignore</button>
            <button className="btn btn-secondary text-xl mx-2">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
