import React, { useContext, useState } from "react";
import Button from "../../base/button";
import { TransferContext } from "../../../contexts/TransferContext";
import useBankStatement from "../../../contexts/useBankStatement";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";

const TransferConfirmation: React.FC = () => {
  const { transferIntrabank, transferIntrabankSubmit, transferIntrabankError } =
    useContext(TransferContext);
  const { bankStatement } = useBankStatement();
  const { destinationAccount } = useContext(SavedAccountsContext);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', '']);
  const [pinError, setPinError] = useState<string | null>(null);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
    }
  };

  const handleTransferIntrabankSubmit = async () => {
    if (pin.join('').length === 6 && transferIntrabank) {
      setPinError(null); // Reset error sebelum mencoba
      try {
        await transferIntrabankSubmit(transferIntrabank, pin.join(''));
        setShowPinModal(false);
        setPin(['', '', '', '', '', '']); // Reset pin setelah berhasil
      } catch (error) {
        setPinError("PIN salah, harap masukkan ulang.");
        setPin(['', '', '', '', '', '']); // Reset pin setelah gagal
      }
    } else {
      setPinError("Masukkan 6 digit PIN.");
    }
  };

  return (
    <section
      className="flex flex-col w-full gap-6"
      aria-labelledby="rekening-info-heading"
    >
      <header>
        <h1 id="rekening-info-heading" className="text-lg font-bold text-white">
          Konfirmasi Transfer
        </h1>
      </header>

      <div className="bg-primary-light-blue rounded-[20px] flex flex-col px-[18px] py-6 gap-7">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
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

          <div className="flex items-center">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Masukkan PIN Anda</h2>
            {pinError && <p className="text-red-600 mb-2">{pinError}</p>}
            <div className="flex space-x-2 mb-4">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="password"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded-lg"
                />
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  setShowPinModal(false);
                  setPinError(null); // Reset error saat menutup modal
                  setPin(['', '', '', '', '', '']); // Reset pin saat menutup modal
                } }
                variant="general"
                colorScheme="secondary" ariaLabel={""}              >
                Batal
              </Button>
              <Button
                onClick={handleTransferIntrabankSubmit}
                variant="general"
                colorScheme="primary" ariaLabel={""}              >
                Konfirmasi
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransferConfirmation;