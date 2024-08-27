import React from "react";
import Skeleton from "../../../base/skeletonloading";

interface BankStatementSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bankStatement: any;
  buttonText: boolean;
  handleStartQrisPay: () => void;
  handleEndQrisPay: () => void;
  loading: boolean;
}

const BankStatementSection: React.FC<BankStatementSectionProps> = ({
  bankStatement,
  buttonText,
  handleStartQrisPay,
  handleEndQrisPay,
  loading,
}) => {
  return (
    <div className="bg-neutran-1 shadow-box h-full rounded flex flex-col p-5 gap-2.5 mt-16 md:mt-0">
      <div className="text-base text-primary-blue mb-[18px]"
      aria-label="Dari rekening">
        Dari Rekening
        </div>
      {loading ? (
        <>
          <Skeleton className="h-6" />
          <div className="flex flex-row gap-4">
            <Skeleton className="h-5 w-40" />
          </div>
        </>
      ) : (
        <div className="text-base text-primary-blue bg-white rounded-[10px] mb-[24px] border border-primary-blue w-full h-[40px] pt-2 pr-3 pb-2 pl-3" aria-label="kolom-nomer-rekening">
          {bankStatement.accountInfo.accountNo}&nbsp;-&nbsp;
          <span className="text-base text-primary-dark-blue">
            {bankStatement.accountInfo.accountType}
          </span>
        </div>
      )}
      <div className="mb-[24px] w-full">
        <div className="text-base text-primary-blue mb-[12px]"
          aria-label="Catatan">
          Catatan
        </div>
        <div className="flex w-full">
          <div className="w-[12px] h-[12px] rounded-[50px] bg-primary-dark-blue mt-[6px]"></div>
          <div className="ml-[12px] text-base text-primary-blue w-[343px]"
            aria-label="QRIS akan ditampikan untuk melakukan pembayaran ">
            QRIS akan ditampikan untuk melakukan pembayaran
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-[12px] h-[12px] rounded-[50px] bg-primary-dark-blue mt-[6px]"></div>
          <div className="text-base ml-[12px] text-primary-blue w-[343px]"
            aria-label="  Pastikan nominal transaksi sudah sesuai. Transaksi dengan QRIS akan
            langsung mendebet rekening anda">
            Pastikan nominal transaksi sudah sesuai. Transaksi dengan QRIS akan
            langsung mendebet rekening anda
          </div>
        </div>
      </div>
      {buttonText ? (
        <button
          onClick={handleStartQrisPay}
          className="text-[18px] text-white bg-primary-blue hover:bg-primary-dark-blue w-full justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
          style={{ fontFamily: "Outfit, sans-serif" }}
          aria-label="Tombol Lanjutkan"
        >
          Lanjutkan
        </button>
      ) : (
        <button
          onClick={handleEndQrisPay}
          className="text-[18px] text-white bg-primary-blue w-full justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
          style={{ fontFamily: "Outfit, sans-serif" }}
          aria-label="Selesai"
        >
          Selesai
        </button>
      )}
    </div>
  );
};

export default BankStatementSection;
