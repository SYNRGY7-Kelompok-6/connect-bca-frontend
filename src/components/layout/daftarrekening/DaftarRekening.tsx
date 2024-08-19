import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";

const DaftarRekening: React.FC = () => {
  const navigate = useNavigate();
  const { savedAccounts, fetchSavedAccounts, changeDestinationAccount } =
    useContext(SavedAccountsContext);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSavedAccounts();
  }, [fetchSavedAccounts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = savedAccounts?.filter((account) =>
    `${account.beneficiaryAccountNumber} - ${account.beneficiaryAccountName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section
      className="flex flex-col shadow-box w-full"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1
          id="rekening-info-heading"
          className="text-md text-white font-bold bg-primary-dark-blue w-full p-[18px] rounded-t"
        >
          Daftar Rekening
        </h1>
      </header>

      <div className="bg-neutral-1 rounded-b flex flex-col w-full px-[18px] py-6 gap-3">
        <div className="flex w-full px-4 py-4 rounded-lg bg-neutral-1 focus-within:outline focus-within:outline-1 outline-primary-blue outline outline-1">
          <label htmlFor="search-input" className="sr-only">
            Cari rekening
          </label>
          <img src="/Search.svg" alt="Search icon" className="w-6 h-6" />
          <input
            id="search-input"
            type="text"
            className="w-full px-2 text-base bg-transparent placeholder-primary-blue focus-within:outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-describedby="search-description"
          />
          <span id="search-description" className="sr-only">
            Masukkan nomor rekening atau nama rekening untuk mencari.
          </span>
        </div>

        <Link to="/transaksi/rekening">
          <div
            className="flex gap-3 px-4 py-4 transition cursor-pointer bg-primary-blue rounded-xl hover:bg-primary-dark-blue"
            role="button"
            aria-label="Tambah rekening baru untuk transfer"
          >
            <img src="/profile-add.svg" alt="Add new account icon" />
            <span className="text-white">Transfer ke tujuan baru</span>
          </div>
        </Link>

        <div className="font-medium text-neutral-9">
          <span className="block px-4 py-4 border-b border-neutral-9">
            Daftar Transfer
          </span>
          <div className="flex flex-col text-base divide-y divide-slate-300">
            {filteredAccounts?.map((account) => (
              <button
                key={account.beneficiaryAccountNumber}
                onClick={() => {
                  changeDestinationAccount(account);
                  navigate("/transaksi/transfer");
                }}
                className="w-full text-left px-4 py-4 transition cursor-pointer hover:bg-primary-blue hover:text-white"
                aria-label={`Pilih rekening ${account.beneficiaryAccountNumber} - ${account.beneficiaryAccountName}`}
              >
                <p>
                  {`${account.beneficiaryAccountNumber} - ${account.beneficiaryAccountName}`}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaftarRekening;
