import React from 'react';
import Button from '../../base/button';
import { Link } from 'react-router-dom';

const RekeningBaru: React.FC = () => {
  return (
    <section
      className="flex flex-col w-full gap-6"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1 id="rekening-info-heading" className="text-lg font-bold text-white">
          Daftar Rekening Baru
        </h1>
      </header>

      <div className="bg-neutral-1 rounded-b flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <label htmlFor="bank-tujuan" className="w-[300px] inline-block">
              Bank Tujuan
            </label>
            <input
              type="text"
              id="bank-tujuan"
              placeholder="Nama Bank"
              className="w-full px-4 py-2 bg-transparent border-b border-primary-blue"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="no-rekening" className="w-[300px] inline-block">
              No. Rekening
            </label>
            <input
              type="text"
              id="no-rekening"
              placeholder="Nomor Rekening"
              className="w-full px-4 py-2 bg-transparent border-b border-primary-blue"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/transaksi/transfer">
            <Button ariaLabel="lanjut" variant="general" colorScheme="primary">
              Lanjut
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RekeningBaru;
