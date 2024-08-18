import React from "react";
import InfoUser from "../components/layout/infouser/InfoUser";
import MenuFitur from "../components/layout/menufitur/MenuFitur";
import ProfileLayout from "../components/layout/profile";

const Profile: React.FC = () => {
  return (
    <div className="font-jakartasans bg-fill0">
      <>
        <InfoUser />
        <MenuFitur />
        <ProfileLayout/>
      </>
    </div>
  );
};

export default Profile;
