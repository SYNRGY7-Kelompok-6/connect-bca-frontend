import React from "react";
import logoDownload from "../../../../../public/download.svg";
import logoRefresh from "../../../../../public/refresh.svg";

interface QrisButtonProps {
  handleDownload: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  timeLeft: string;
}

const QrisButton: React.FC<QrisButtonProps> = ({
  handleRefresh,
  handleDownload,
  timeLeft,
}) => (
  <>
    <div className="text-base mt-[12px] text-primary-dark-blue">{timeLeft}</div>
    <div className="flex justify-between mt-[24px] w-[100%]">
      <div
        className="flex justify-between w-[98px]"
        aria-label="Tombol Download"
      >
        <img
          src={logoDownload}
          aria-label="Tombol Unduh Qris"
          alt="downloadQrisTf"
          onClick={handleDownload}
          style={{ cursor: "pointer" }}
        />
      </div>
      <img
        src={logoRefresh}
        alt="refreshQrisTf"
        aria-label="Tombol Segarkan Barcode Qris"
        onClick={handleRefresh}
        style={{ cursor: "pointer" }}
      />
    </div>
  </>
);

export default QrisButton;
