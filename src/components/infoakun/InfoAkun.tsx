import React from "react";

const InfoAkun: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-flow-row">
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
            <p className="text-white text-sm font-semibold">
              : 10 - Jul - 2024
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-[215px] text-white text-sm font-semibold">
              Lokasi Terakhir Akun Terhubung
            </p>
            <p className="text-white text-sm font-semibold">: Surabaya</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-2 items-center gap-[20px]">
        <h1 className="text-lg text-white font-bold">
          Mutasi Rekening Terkini
        </h1>
        <div className="overflow-x-auto rounded-[10px]">
          <table className="min-w-full bg-white">
            <thead className="bg-white text-primary-dark-blue">
              <tr>
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">No Rekening</th>
                <th className="py-2 px-4">Nominal</th>
                <th className="py-2 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="bg-[#0066AE] text-white">
              <tr className="text-center">
                <td className="py-2 px-4">2024-07-01</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">1234567890</td>
                <td className="py-2 px-4">500000</td>
                <td className="py-2 px-4">Payment for services</td>
              </tr>
              <tr className="text-center">
                <td className="py-2 px-4">2024-07-02</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">0987654321</td>
                <td className="py-2 px-4">750000</td>
                <td className="py-2 px-4">Refund</td>
              </tr>
              {/* Tambahkan baris lain sesuai kebutuhan */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfoAkun;
