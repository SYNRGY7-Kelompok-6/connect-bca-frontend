import React, { useContext } from "react";
import Button from "../../base/button";
import { TransferContext } from "../../../contexts/TransferContext";
import useBankStatement from "../../../contexts/useBankStatement";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";

const TransferConfirmation: React.FC = () => {
  const { transferIntrabank, transferIntrabankSubmit } =
    useContext(TransferContext);

  const { bankStatement } = useBankStatement();
  const { destinationAccount } = useContext(SavedAccountsContext);

  const handleTransferIntrabankSubmit = async () => {
    if (transferIntrabank) {
      await transferIntrabankSubmit(transferIntrabank);
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
            onClick={handleTransferIntrabankSubmit}
            ariaLabel="lanjut"
            variant="general"
            colorScheme="primary"
          >
            Lanjut
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransferConfirmation;
