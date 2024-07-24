import React from "react";

const InfoAkun: React.FC = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-lg text-white font-bold">Informasi Akun</h1>
      <div className="bg-primary-blue rounded-5 flex flex-col w-[400px] rounded-[20px] p-5 gap-[7px]">
        <div className="flex gap-2">
          <p className="w-[215px] text-white text-sm font-semibold">
            Masa Berlaku Pin (hari){" "}
          </p>
          <p className="text-white text-sm font-semibold">: 200 hari</p>
        </div>
        <div className="flex gap-2">
          <p className="w-[215px] text-white text-sm font-semibold">
            Tanggal Terakhir Gagal Login
          </p>
          <p className="text-white text-sm font-semibold">: 10 - Jul - 2024</p>
        </div>
        <div className="flex gap-2">
          <p className="w-[215px] text-white text-sm font-semibold">
            Lokasi Terakhir Akun Terhubung
          </p>
          <p className="text-white text-sm font-semibold">: Surabaya</p>
        </div>
      </div>
    </div>
  );
};

export default InfoAkun;
