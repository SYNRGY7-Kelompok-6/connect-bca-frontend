import React, { useContext, useState } from "react";
import Button from "../../base/button";
import { useNavigate } from "react-router-dom";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
import useBankStatement from "../../../contexts/useBankStatement";
import {
  TransferContext,
  TransferIntrabank,
} from "../../../contexts/TransferContext";
import Popup from "../../base/popup";

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const { destinationAccount } = useContext(SavedAccountsContext);
  const { bankStatement } = useBankStatement();
  const { changeTransferIntrabank } = useContext(TransferContext);

  const [transferIntrabank, setTransferIntrabank] = useState<TransferIntrabank>(
    {
      beneficiaryAccountNumber:
        destinationAccount?.beneficiaryAccountNumber || "",
      remark: "Transfer",
      desc: "",
      amount: {
        currency: "IDR",
        value: 0,
      },
    }
  );

  const [scheduleTransfer, setScheduleTransfer] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false); // Popup state
  const [popupMessage, setPopupMessage] = useState<string>(""); // Popup message

  const handleContinue = () => {
    if (transferIntrabank.amount.value <= 100) {
      setPopupMessage("Nominal transfer harus lebih dari 100 IDR");
      setShowPopup(true);
      return;
    }

    changeTransferIntrabank(transferIntrabank);
    navigate("/transaksi/transfer/confirmation");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section
      className="flex flex-col w-full shadow-box"
      aria-labelledby="transfer-form-heading"
    >
      <header>
        <h1
          id="transfer-form-heading"
          className="text-md text-white font-bold bg-primary-dark-blue w-full p-[18px] rounded-t"
        >
          Transfer ke Rekening BCA
        </h1>
      </header>

      <div className="bg-neutral-1 rounded-[20px] flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <label htmlFor="ke-rekening" className="w-[300px] inline-block">
              Ke Rekening
            </label>
            <div
              id="ke-rekening"
              className="w-full px-4 py-2 border rounded-lg border-primary-blue"
            >
              <span className="font-bold text-primary-blue">
                {destinationAccount?.beneficiaryAccountName} -{" "}
              </span>
              {destinationAccount?.beneficiaryAccountNumber}
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="dari-rekening" className="w-[300px] inline-block">
              Dari Rekening
            </label>
            <div
              id="dari-rekening"
              className="w-full px-4 py-2 border rounded-lg border-primary-blue"
            >
              <span className="font-bold text-primary-blue">
                {bankStatement?.accountInfo.name} -{" "}
              </span>
              {bankStatement?.accountInfo.accountNo}
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="mata-uang" className="w-[300px] inline-block">
              Mata Uang Tujuan
            </label>
            <div className="w-full flex flex-row items-center">
              <span className="pr-4">IDR</span>
              <input
                type="number"
                id="mata-uang"
                placeholder="Masukan Nominal Anda"
                className="px-4 py-2 bg-transparent border-b border-primary-blue w-full"
                value={transferIntrabank?.amount.value || ""}
                onChange={(e) =>
                  setTransferIntrabank({
                    ...transferIntrabank,
                    amount: {
                      ...transferIntrabank.amount,
                      value: parseInt(e.target.value) || 0,
                    },
                  })
                }
                aria-labelledby="mata-uang-label"
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
              value={transferIntrabank?.desc}
              onChange={(e) =>
                setTransferIntrabank({
                  ...transferIntrabank,
                  desc: e.target.value,
                })
              }
              aria-labelledby="berita-label"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="jenis-transfer" className="w-[300px] inline-block">
              Jenis Transfer
            </label>
            <div className="flex w-full gap-2">
              <button
                onClick={() => setScheduleTransfer(false)}
                className={`flex-auto py-2 font-medium border rounded-lg border-primary-blue ${
                  !scheduleTransfer
                    ? "bg-primary-blue text-white"
                    : "text-primary-blue"
                }`}
                aria-pressed={!scheduleTransfer}
                aria-controls="tanggal-transfer"
              >
                Sekarang
              </button>
              <button
                onClick={() => setScheduleTransfer(true)}
                className={`flex-auto py-2 font-medium ${
                  scheduleTransfer
                    ? "bg-primary-blue text-white"
                    : "border rounded-lg border-primary-blue text-primary-blue"
                }`}
                aria-pressed={scheduleTransfer}
                aria-controls="tanggal-transfer"
              >
                Atur Tanggal
              </button>
            </div>
          </div>

          {scheduleTransfer && (
            <div className="flex items-center">
              <label
                htmlFor="tanggal-transfer"
                className="w-[300px] inline-block"
              >
                Tanggal Transfer
              </label>
              <input
                type="date"
                id="tanggal-transfer"
                placeholder="Tanggal Transfer"
                className="w-full px-4 py-2 bg-transparent border-b border-primary-blue"
                aria-labelledby="tanggal-transfer-label"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button onClick={handleContinue}>
            <Button ariaLabel="lanjut" variant="general" colorScheme="primary">
              Lanjut
            </Button>
          </button>
        </div>

        {showPopup && (
          <Popup
            svgSrc="/AlertError.svg"
            svgAlt="Alert Error"
            message={popupMessage}
            buttonText="Ulangi"
            onButtonClick={closePopup}
          />
        )}
      </div>
    </section>
  );
};

export default TransferForm;
