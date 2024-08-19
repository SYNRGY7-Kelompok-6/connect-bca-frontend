import React, { useState, useContext } from "react";
import Button from "../../base/button";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
import Popup from "../../base/popup/popup";
import { Link } from "react-router-dom";

const RekeningBaru: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { addSavedAccount, error, changeDestinationAccount } =
    useContext(SavedAccountsContext);

  const handleAddAccount = async () => {
    if (!accountNumber) {
      return;
    }

    setLoading(true);
    try {
      const newAccount = await addSavedAccount(accountNumber);
      if (newAccount) {
        changeDestinationAccount(newAccount);
        setAccountNumber("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Show popup if there's an error
  React.useEffect(() => {
    if (error) {
      setIsPopupOpen(true);
    }
  }, [error]);

  return (
    <section
      className="flex flex-col w-full shadow-box"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1
          id="rekening-info-heading"
          className="text-md text-white font-bold bg-primary-dark-blue w-full p-[18px] rounded-t"
        >
          Daftar Rekening Baru
        </h1>
      </header>

      <div className="bg-neutral-1 rounded-b flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <label htmlFor="bank-tujuan" className="w-[300px] inline-block">
              Bank Tujuan
            </label>
            <div className="w-full px-4 py-2 bg-transparent border border-primary-blue rounded">
              Bank Central Asia
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="no-rekening" className="w-[300px] inline-block">
              No. Rekening
            </label>
            <input
              type="text"
              id="no-rekening"
              placeholder="Nomor Rekening"
              className="px-4 py-2 bg-transparent border-b border-primary-blue w-full focus:outline-primary-blue"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/transaksi/transfer">
            <Button
              ariaLabel="lanjut"
              variant="general"
              colorScheme="primary"
              onClick={handleAddAccount}
              disabled={loading}
              className="flex items-center"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
              ) : (
                "Lanjut"
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Popup for error */}
      {isPopupOpen && error && (
        <Popup
          svgSrc="/AlertError.svg"
          svgAlt="Error Icon"
          message={error}
          button={true}
          buttonText="Tutup"
          onButtonClick={handleClosePopup}
        />
      )}
    </section>
  );
};

export default RekeningBaru;
