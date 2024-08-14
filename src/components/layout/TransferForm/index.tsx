import React, { useContext, useState } from "react";
import Button from "../../base/button";
import { Link, useNavigate } from "react-router-dom";
import { SavedAccountsContext } from "../../../contexts/SavedAccountsContext";
import useBankStatement from "../../../contexts/useBankStatement";
import {
  TransferContext,
  TransferIntrabank,
} from "../../../contexts/TransferContext";

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
                {destinationAccount?.beneficiaryAccountName} -{" "}
              </span>
              {destinationAccount?.beneficiaryAccountNumber}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-[300px] inline-block">Dari Rekening</label>
            <div className="w-full px-4 py-2 border rounded-lg border-primary-blue">
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
            <div className="w-full">
              <span className="pr-4">IDR</span>
              <input
                type="number"
                id="mata-uang"
                placeholder="20.000.000"
                className="px-4 py-2 bg-transparent border-b border-primary-blue"
                value={transferIntrabank?.amount.value}
                onChange={(e) =>
                  setTransferIntrabank({
                    ...transferIntrabank,
                    amount: {
                      ...transferIntrabank.amount,
                      value: parseInt(e.target.value),
                    },
                  })
                }
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
          <button
            onClick={() => {
              changeTransferIntrabank(transferIntrabank);
              navigate("/transaksi/transfer/confirmation");
            }}
          >
            <Button ariaLabel="lanjut" variant="general" colorScheme="primary">
              Lanjut
            </Button>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransferForm;
