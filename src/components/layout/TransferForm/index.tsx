import React from 'react';
import Button from '../../base/button';
import { Link } from 'react-router-dom';

const TransferForm: React.FC = () => {
  return (
    <section
      className="flex flex-col w-full gap-6"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1 id="rekening-info-heading" className="text-lg font-bold text-white">
          Transfer ke Rekening BCA
        </h1>
      </header>

      <div className="bg-primary-light-blue rounded-[20px] flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <label className="w-[300px] inline-block">Ke Rekening</label>
            <div className="w-full px-4 py-2 border rounded-lg border-primary-blue">
              <span className="font-bold text-primary-blue">
                Budi Sudarsono -{' '}
              </span>
              444999000111
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-[300px] inline-block">Dari Rekening</label>
            <div className="w-full px-4 py-2 border rounded-lg border-primary-blue">
              <span className="font-bold text-primary-blue">
                145 267 389 5162 -{' '}
              </span>
              Tahapan Xpesi - IDR
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="mata-uang" className="w-[300px] inline-block">
              Mata Uang Tujuan
            </label>
            <div className="w-full">
              <span className="pr-4">IDR</span>
              <input
                type="text"
                id="mata-uang"
                placeholder="20.000.000"
                className="px-4 py-2 bg-transparent border-b border-primary-blue"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="berita" className="w-[300px] inline-block">
              Berita
            </label>
            <input
              type="text"
              id="berita"
              placeholder="Pembayaran"
              className="w-full px-4 py-2 bg-transparent border-b border-primary-blue"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="berita" className="w-[300px] inline-block">
              Jenis Transfer
            </label>
            <div className="flex w-full gap-2">
              <button className="flex-auto py-2 font-medium border rounded-lg border-primary-blue text-primary-blue">
                Sekarang
              </button>
              <button className="flex-auto py-2 font-medium text-white rounded-lg bg-primary-blue">
                Atur Tanggal
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="berita" className="w-[300px] inline-block">
              Tanggal Transfer
            </label>
            <input
              type="text"
              id="berita"
              placeholder="Tanggal Transfer"
              className="w-full px-4 py-2 bg-transparent border-b border-primary-blue"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/transaksi/transfer/confirmation">
            <Button ariaLabel="lanjut" variant="general" colorScheme="primary">
              Lanjut
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TransferForm;
