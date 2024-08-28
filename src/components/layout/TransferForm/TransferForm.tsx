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
      scheduleDate: undefined, // Tambahkan field ini untuk mengelola tanggal transfer
    }
  );

  const [scheduleTransfer, setScheduleTransfer] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleContinue = () => {
    if (transferIntrabank.amount.value <= 100) {
      setPopupMessage("Nominal transfer harus lebih dari 100 IDR");
      setShowPopup(true);
      return;
    }

    if (
      !bankStatement ||
      !bankStatement.accountInfo ||
      !bankStatement.accountInfo.balance ||
      !bankStatement.accountInfo.balance.availableBalance ||
      transferIntrabank.amount.value >
        bankStatement.accountInfo.balance.availableBalance.value
    ) {
      setPopupMessage("Saldo tidak mencukupi untuk melakukan transfer");
      setShowPopup(true);
      return;
    }

    setLoading(true);

    // Ambil tanggal transfer dari input jika diperlukan
    const transferDate = scheduleTransfer
      ? new Date(
          (
            document.getElementById("tanggal-transfer") as HTMLInputElement
          )?.value
        )
      : undefined;
    console.log("Transfer Date:", transferDate);
    console.log(
      "Transfer Date ISO String:",
      transferDate ? transferDate.toISOString() : undefined
    );
    // Mengatur data transferIntrabank
    setTransferIntrabank((prevState) => ({
      ...prevState,
      scheduleDate: transferDate ? transferDate.toISOString() : undefined, // Set scheduleDate jika ada
    }));

    // Logika untuk menentukan apakah transfer dijadwalkan atau segera
    if (scheduleTransfer && transferDate) {
      // Lakukan transfer yang dijadwalkan
      changeTransferIntrabank({
        ...transferIntrabank,
        scheduleDate: transferDate ? transferDate.toISOString() : undefined,
      });
    } else {
      // Lakukan transfer segera
      changeTransferIntrabank({
        ...transferIntrabank,
        scheduleDate: undefined,
      });
    }

    navigate("/transaksi/transfer/confirmation");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const inputValue = parseInt(rawValue, 10) || 0;
    setTransferIntrabank({
      ...transferIntrabank,
      amount: {
        ...transferIntrabank.amount,
        value: inputValue < 0 ? 0 : inputValue,
      },
    });
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
          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center">
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
              <span style={{ letterSpacing: "-0.09em" }}>
                {destinationAccount?.beneficiaryAccountNumber
                  .split("")
                  .join(" ")}
              </span>
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center">
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
              <span style={{ letterSpacing: "-0.09em" }}>
                {bankStatement?.accountInfo.accountNo.split("").join(" ")}
              </span>
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center">
            <label htmlFor="mata-uang" className="w-[300px] inline-block">
              Mata Uang Tujuan
            </label>
            <div className="w-full flex flex-row items-center">
              <span className="pr-4">IDR</span>
              <input
                type="text"
                onMouseEnter={(e) => e.currentTarget.focus()}
                id="mata-uang"
                placeholder="Masukan Nominal Anda"
                className="px-4 py-2 bg-transparent border-b border-primary-blue w-full focus:outline-primary-blue"
                value={
                  transferIntrabank.amount.value
                    ? formatCurrency(transferIntrabank.amount.value)
                    : ""
                }
                onChange={handleAmountChange}
                aria-labelledby="mata-uang-label"
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center">
            <label htmlFor="berita" className="w-[300px] inline-block">
              Berita
            </label>
            <input
              type="text"
              id="berita"
              onMouseEnter={(e) => e.currentTarget.focus()}
              placeholder="Pembayaran"
              className="w-full px-4 py-2 bg-transparent border-b border-primary-blue focus:outline-primary-blue"
              value={transferIntrabank?.desc}
              onChange={(e) =>
                setTransferIntrabank({
                  ...transferIntrabank,
                  desc: e.target.value,
                })
              }
              aria-labelledby="berita-label"
              aria-label="Masukan Berita Anda"
            />
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center">
            <label htmlFor="jenis-transfer" className="w-[300px] inline-block">
              Jenis Transfer
            </label>
            <div className="flex w-full gap-2">
              <button
                onClick={() => setScheduleTransfer(false)}
                onMouseEnter={(e) => e.currentTarget.focus()}
                className={`flex-auto py-2 font-medium border rounded-lg border-primary-blue ${
                  !scheduleTransfer
                    ? "bg-primary-blue text-white"
                    : "text-primary-blue"
                }`}
                aria-pressed={!scheduleTransfer}
                aria-controls="tanggal-transfer"
                aria-label="Transfer Sekarang"
                role="button"
              >
                Sekarang
              </button>
              <button
                onClick={() => setScheduleTransfer(true)}
                onMouseEnter={(e) => e.currentTarget.focus()}
                className={`flex-auto py-2 font-medium ${
                  scheduleTransfer
                    ? "bg-primary-blue text-white rounded-lg"
                    : "border rounded-lg border-primary-blue text-primary-blue"
                }`}
                aria-pressed={scheduleTransfer}
                aria-controls="tanggal-transfer"
                aria-label="Atur Tanggal Transfer"
                role="button"
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
          <Button
            onClick={handleContinue}
            ariaLabel="lanjut"
            variant="general"
            colorScheme="primary"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              "Lanjut"
            )}
          </Button>
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
