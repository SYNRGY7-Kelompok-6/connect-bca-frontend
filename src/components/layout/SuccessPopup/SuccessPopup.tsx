import React, { useRef, useEffect } from "react";
import html2PDF from "jspdf-html2canvas";

interface SuccessPopupProps {
  data: {
    amount: {
      value: number;
      currency: string;
    };
    beneficiaryAccountNumber: string;
    beneficiaryName: string;
    desc: string;
    refNumber: string;
    remark: string;
    sourceAccountNumber: string;
    sourceName: string;
    transactionDate: string;
    transactionId: string;
  };
  onClose: () => void;
  className?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  data,
  onClose,
  className,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.focus();
    }
  }, []);

  const downloadPDF = () => {
    if (popupRef.current) {
      const options = {
        filename: "success-popup.pdf",
        html2canvas: { scale: 2 }, // Adjust scale for better quality if needed
      };
      html2PDF(popupRef.current, options);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="success-popup-title"
      aria-describedby="success-popup-description"
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
    >
      <div
        ref={popupRef}
        tabIndex={-1}
        className="bg-neutral-1 p-6 rounded shadow-box max-w-md mx-4 flex flex-col items-center w-full"
      >
        <img src="/success.svg" alt="Success icon" />
        <h2
          id="success-popup-title"
          className="text-base text-neutral-9 font-bold mb-4"
        >
          Transfer Berhasil
        </h2>
        <h3 className="text-neutral-9 text-lg font-bold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: data.amount.currency,
          }).format(data.amount.value)}
        </h3>
        <div
          id="success-popup-description"
          className="flex flex-col gap-1 mb-4 w-full"
        >
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>No Ref:</p>
            <p>{data.transactionId}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Tanggal Transaksi:</p>
            <p>{new Date(data.transactionDate).toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Nama Penerima:</p>
            <p>{data.beneficiaryName}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Rekening Tujuan:</p>
            <p>{data.beneficiaryAccountNumber}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Dari Rekening:</p>
            <p>{data.sourceAccountNumber}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Deskripsi:</p>
            <p>{data.desc}</p>
          </div>
          <div className="flex flex-col gap-1 text-base neutral-9">
            <p>Remark:</p>
            <p>{data.remark}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary-blue text-white rounded-lg w-full"
            aria-label="Close"
          >
            Selesai
          </button>
          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 bg-secondary-green text-white rounded-lg w-full"
            aria-label="Download PDF"
          >
            Unduh PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
