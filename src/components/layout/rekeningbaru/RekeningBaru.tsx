import React, { useState, useContext, useEffect } from "react";
import Button from "../../base/button";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
import Popup from "../../base/popup/popup";
import { useNavigate } from "react-router-dom";

const RekeningBaru: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null); // New state for input error
  const { addSavedAccount, error, changeDestinationAccount, clearError } =
    useContext(SavedAccountsContext);
  const navigate = useNavigate();

  const handleAddAccount = async () => {
    if (!accountNumber) {
      setInputError("No. Rekening tidak boleh kosong"); // Set error message if input is empty
      return;
    }

    setInputError(null); // Clear any existing input errors

    setLoading(true);
    try {
      const newAccount = await addSavedAccount(accountNumber);
      if (newAccount) {
        changeDestinationAccount(newAccount);
        setAccountNumber("");
        navigate("/transaksi/transfer");
      }
    } catch (e) {
      // Optionally handle specific errors if needed
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    clearError();
  };

  useEffect(() => {
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
            <div className="w-full">
              <input
                type="text"
                id="no-rekening"
                placeholder="Nomor Rekening"
                className={`px-4 py-2 bg-transparent border-b border-primary-blue w-full focus:outline-primary-blue ${
                  inputError ? "border-red-500" : ""
                }`}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              {inputError && (
                <p className="text-secondary-red text-base mt-1">{inputError}</p> // Display error message
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
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
