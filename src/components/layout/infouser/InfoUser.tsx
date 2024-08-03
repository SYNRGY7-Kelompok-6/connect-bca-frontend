import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../contexts/useAuth";

const InfoUser: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex bg-fill1 h-[128px]">
      <div className="container mx-auto my-auto flex justify-between">
        <div className="flex flex-col gap-[13px]">
          <h1 className="text-white text-md font-semibold">
            Selamat Datang Bapak Binar Academy
          </h1>
          <div className="flex flex-row gap-4">
            <p className="text-white text-sm font-medium">
              Login Terakhir : 15 - Jul - 2024
            </p>
            <p className="text-white text-sm font-medium">10:30:00 WIB</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white text-sm font-medium underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
