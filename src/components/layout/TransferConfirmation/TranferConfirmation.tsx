import React, { useContext, useState } from "react";
import Button from "../../base/button";
import { TransferContext } from "../../../contexts/TransferContext";
import useBankStatement from "../../../contexts/useBankStatement";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
import PopupPin from "../../base/popuppin";
import SuccessPopup from "../SuccessPopup";
import Popup from "../../base/popup/popup";

const TransferConfirmation: React.FC = () => {
  const { transferIntrabank, transferIntrabankSubmit, transferIntrabankError } =
    useContext(TransferContext);
  const { bankStatement } = useBankStatement();
  const { destinationAccount } = useContext(SavedAccountsContext);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handlePinSubmit = async (pin: string) => {
    if (pin.length === 6 && transferIntrabank) {
      setPinError(null);
      try {
        const response = await transferIntrabankSubmit(transferIntrabank, pin);
        if (response.status === 200) {
          setShowPinModal(false);
          setShowSuccessPopup(true);
        } else {
          setShowPinModal(false);
          setShowErrorPopup(true);
        }
      } catch (error) {
        console.error("Transfer error:", error);
        setPinError("PIN salah, harap masukkan ulang.");
        setShowPinModal(false);
        setShowErrorPopup(true);
      }
    } else {
      setPinError("Masukkan 6 digit PIN.");
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

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
          Konfirmasi Transfer
        </h1>
      </header>

      <div className="bg-neutral-1 rounded-b flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-6">
          {/* Account details */}
          <div className="flex md:flex-row flex-col md:gap-0 gap-2">
            <label className="w-[300px] inline-block font-semibold">
              Ke Rekening
            </label>
            <div className="w-full px-4 py-2 border rounded-lg border-primary-blue">
              <span className="font-bold text-primary-blue">
                {destinationAccount?.beneficiaryAccountName} -{" "}
              </span>
              {destinationAccount?.beneficiaryAccountNumber}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:gap-0 gap-2">
            <label className="w-[300px] inline-block font-semibold">
              Dari Rekening
            </label>
            <div className="w-full px-4 py-2 border rounded-lg border-primary-blue">
              <span className="font-bold text-primary-blue">
                {bankStatement?.accountInfo.name} -{" "}
              </span>
              {bankStatement?.accountInfo.accountNo}
            </div>
          </div>

          {/* Other details */}
          <div className="flex items-center">
            <label
              htmlFor="metode-transfer"
              className="w-[300px] inline-block font-semibold"
            >
              Metode Transfer
            </label>
            :
            <input
              type="text"
              id="metode-transfer"
              value="Sesama BCA"
              className="w-full px-4 py-2 font-semibold bg-transparent"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="nominal-tujuan"
              className="w-[300px] inline-block font-semibold"
            >
              Nominal Tujuan
            </label>
            :
            <input
              type="text"
              id="nominal-tujuan"
              value={
                transferIntrabank
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(transferIntrabank.amount.value)
                  : ""
              }
              className="w-full px-4 py-2 font-semibold bg-transparent"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="berita"
              className="w-[300px] inline-block font-semibold"
            >
              Berita
            </label>
            :
            <input
              type="text"
              id="berita"
              value={transferIntrabank?.desc}
              className="w-full px-4 py-2 font-semibold bg-transparent"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="jenis-transfer"
              className="w-[300px] inline-block font-semibold"
            >
              Jenis Transfer
            </label>
            :
            <input
              type="text"
              id="jenis-transfer"
              value="Transfer Sekarang"
              className="w-full px-4 py-2 font-semibold bg-transparent"
            />
          </div>
        </div>

        {/* Error display */}
        {pinError && <div className="text-red-500">{pinError}</div>}

        <div className="flex justify-end">
          <Button
            onClick={() => setShowPinModal(true)}
            ariaLabel="lanjut"
            variant="general"
            colorScheme="primary"
          >
            Lanjut
          </Button>
        </div>
      </div>

      {showPinModal && (
        <PopupPin onPinSubmit={handlePinSubmit} className="md:w-[490px] w-full" />
      )}

      {showSuccessPopup && (
        <SuccessPopup
          data={{
            amount: transferIntrabank?.amount || { value: 0, currency: "IDR" },
            beneficiaryAccountNumber:
              destinationAccount?.beneficiaryAccountNumber || "",
            beneficiaryName: destinationAccount?.beneficiaryAccountName || "",
            desc: transferIntrabank?.desc || "",
            refNumber: "SomeRefNumber",
            remark: transferIntrabank?.remark || "",
            sourceAccountNumber: bankStatement?.accountInfo.accountNo || "",
            sourceName: bankStatement?.accountInfo.name || "",
            transactionDate: new Date().toISOString(),
            transactionId: "SomeTransactionId",
          }}
          onClose={handleCloseSuccessPopup}
        />
      )}

      {showErrorPopup && (
        <Popup
          message={transferIntrabankError || "Terjadi kesalahan."}
          svgSrc="/AlertError.svg"
          svgAlt="Error Icon"
          button={true}
          buttonText="Tutup"
          className="w-[490px]"
          onButtonClick={handleCloseErrorPopup}
        />
      )}
    </section>
  );
};

export default TransferConfirmation;
