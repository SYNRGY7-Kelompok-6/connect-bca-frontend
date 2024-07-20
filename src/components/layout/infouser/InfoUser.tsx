import React from "react";

const InfoUser: React.FC = () => {
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
          <a
            href="/logout"
            className="text-white text-sm font-medium underline"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
