import React from "react";
import Button from "../../base/button";

const LaporanKeuangan: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-[20px] w-[500px]">
        <h1 className="text-lg text-white font-bold">
          Laporan Keunagan Rekening
        </h1>
        <div className="flex bg-[#1C1C1E] px-[32px] py-[32px] justify-between items-center rounded-[20px]">
          <div>
            <p className="text-sm text-white font-medium">
              Siklus Laporan Keuangan Saat Ini
            </p>
            <p className="text-sm text-white font-medium">
              1 Jun 2024 - 30 Jun 2024
            </p>
          </div>
          <div>
            <Button
              type="button"
              // onClick={handleReset}
              ariaLabel="Tombol menghapus semua isian di kolom"
              variant="micro"
              colorScheme="primary"
              state="active"
            >
              Ubah siklus
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-[#1C1C1E] px-[32px] py-[32px] justify-center items-center rounded-[20px]">
          <div className="inline-flex rounded-md shadow-sm">
            <a
              href="#"
              aria-current="page"
              className="px-8 py-2 text-sm font-medium border border-white rounded-s-lg hover:bg-primary-blue text-white"
            >
              Bulan Ini
            </a>
            <a
              href="#"
              className="px-8 py-2 text-sm font-medium border-t border-b border-white hover:bg-primary-blue text-white"
            >
              Bulan Lalu
            </a>
            <a
              href="#"
              className="px-8 py-2 text-sm font-medium border border-white rounded-e-lg hover:bg-primary-blue text-white"
            >
              3 Bulan
            </a>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p className="text-white font-medium text-sm">Selisih</p>
            <h3 className="text-white font-bold text-lg">Rp 636.800</h3>
          </div>
          <div className="flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <img src="/ArrowPemasukan.svg" alt="" />
                <p className="text-white font-medium text-sm">Pemasukan</p>
              </div>
              <h3 className="text-secondary-green text-lg font-bold">
                Rp 1.560.000
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <img src="/ArrowPengeluaran.svg" alt="" />
                <p className="text-white font-medium text-sm">Pengeluaran</p>
              </div>
              <h3 className="text-secondary-red text-lg font-bold">
                Rp 1.560.000
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaporanKeuangan;
