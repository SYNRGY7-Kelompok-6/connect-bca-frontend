import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  className = "",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, []);

  const downloadPDF = () => {
    if (contentRef.current) {
      if (buttonGroupRef.current) {
        buttonGroupRef.current.style.display = "none";
      }

      const options = {
        filename: "success-transfer.pdf",
        html2canvas: { scale: 2 },
      };

      html2PDF(contentRef.current, options).then(() => {
        if (buttonGroupRef.current) {
          buttonGroupRef.current.style.display = "flex";
        }
      });
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  
  return (
    <div
      role="dialog"
      aria-labelledby="success-popup-title"
      aria-describedby="success-popup-description"
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      aria-live="assertive"
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className="bg-neutral-1 p-6 rounded shadow-box max-w-md mx-4 flex flex-col items-center w-full"
      >
        <div className="flex flex-col gap-2 items-center">
          <img
            src="/success.svg"
            alt="Ikon berhasil"
            className="w-14"
            aria-hidden="true"
          />
          <h2
            id="success-popup-title"
            className="text-base text-neutral-9 font-bold"
            tabIndex={-1}
          >
            Transfer Berhasil
          </h2>
          <h3 className="text-neutral-9 text-lg font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: data.amount.currency,
            }).format(data.amount.value)}
          </h3>
        </div>
        <div
          id="success-popup-description"
          className="flex flex-col gap-1 mb-4 w-full"
        >
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>No Ref:</p>
            <p>{data.transactionId}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Tanggal Transaksi:</p>
            <p>{new Date(data.transactionDate).toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Nama Penerima:</p>
            <p>{data.beneficiaryName}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Rekening Tujuan:</p>
            <p>{data.beneficiaryAccountNumber}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Dari Rekening:</p>
            <p>{data.sourceAccountNumber}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Deskripsi:</p>
            <p>{data.desc}</p>
          </div>
          <div className="flex flex-col gap-1 text-base text-neutral-9">
            <p>Remark:</p>
            <p>{data.remark}</p>
          </div>
        </div>
        <div ref={buttonGroupRef} className="flex gap-4 w-full">
          <button
            onClick={handleClose}
            className="mt-4 px-4 py-2 bg-primary-blue text-white rounded-lg w-full"
            aria-label="Tombol Selesai"
          >
            Selesai
          </button>
          <button
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 bg-secondary-red text-white rounded-lg w-full"
            aria-label="Tombol Unduh PDF"
          >
            Unduh PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
