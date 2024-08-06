import React from 'react';
import { Link } from 'react-router-dom';

const DaftarRekening: React.FC = () => {
  return (
    <section
      className="flex flex-col gap-6"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1 id="rekening-info-heading" className="text-lg font-bold text-white">
          Daftar Rekening
        </h1>
      </header>

      <div className="bg-primary-light-blue rounded-[20px] flex flex-col w-[710px] px-[18px] py-6 gap-3">
        <div className="flex w-full px-3 py-2 rounded-lg bg-slate-300 focus-within:outline focus-within:outline-1 outline-slate-900">
          <img src="/Search.svg" alt="Search" className="w-6 h-6" />
          <input
            type="text"
            className="w-full px-2 text-sm bg-transparent placeholder-primary-blue focus-within:outline-none"
            placeholder="Search"
          />
        </div>

        <Link to="/transaksi/rekening">
          <div className="flex gap-3 px-3 py-2 transition cursor-pointer bg-primary-blue rounded-xl hover:bg-primary-dark-blue">
            <img src="/profile-add.svg" alt="" />
            <span className="text-white">Transfer ke tujuan baru</span>
          </div>
        </Link>

        <div className="font-medium text-primary-blue">
          <span className="block px-3 py-2 border-b border-primary-blue">
            Daftar Transfer
          </span>
          <div className="flex flex-col text-sm divide-y divide-slate-300">
            <Link to="/transaksi/transfer">
              <p className="px-3 py-2 transition cursor-pointer hover:bg-primary-blue hover:text-white">
                54728974829482 - Stenafy Putri Santoso
              </p>
            </Link>
            <Link to="/transaksi/transfer">
              <p className="px-3 py-2 transition cursor-pointer hover:bg-primary-blue hover:text-white">
                54728974829482 - Stenafy Putri Santoso
              </p>
            </Link>
            <Link to="/transaksi/transfer">
              <p className="px-3 py-2 transition cursor-pointer hover:bg-primary-blue hover:text-white">
                54728974829482 - Stenafy Putri Santoso
              </p>
            </Link>
            <Link to="/transaksi/transfer">
              <p className="px-3 py-2 transition cursor-pointer hover:bg-primary-blue hover:text-white">
                54728974829482 - Stenafy Putri Santoso
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaftarRekening;
