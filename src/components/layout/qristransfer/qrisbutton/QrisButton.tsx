import React from 'react';
import logoDownload from "../../../../../public/download.svg";
import logoRefresh from "../../../../../public/refresh.svg";

interface QrisButtonProps {
    buttonText: string;
    handleOpenModal: () => void;
    handleRefresh: () => void;
    handleDownlaod: () => void;
    timeLeft: string;
}

const QrisButton: React.FC<QrisButtonProps> = ({ buttonText, handleOpenModal, handleRefresh, handleDownlaod, timeLeft }) => (
    <>
        <button
            onClick={handleOpenModal}
            className="flex mt-[24px] text-sm text-primary-blue w-[175px] justify-center items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
        >
            {buttonText}
        </button>
        <div className="text-base mt-[12px] text-primary-dark-blue">
            {timeLeft}
        </div>
        <div className="flex justify-between mt-[24px] w-[100%]">
            <div className="flex justify-between w-[98px]"
                aria-label="Tombol Download">
                <img src={logoDownload}
                    aria-label="Tombol Unduh Qris"
                    alt="downloadQrisTf"
                    onClick={handleDownlaod}
                    style={{ cursor: "pointer" }} />
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
