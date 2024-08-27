import React from "react";

interface QrisImageProps {
  qrImage?: string;
  expiresTime: boolean;
  timeLeft: string;
}

const QrisImage: React.FC<QrisImageProps> = ({
  qrImage,
  expiresTime,
  timeLeft,
}) => {
  return (
    <div className="relative flex flex-col justify-center items-center" >
      {expiresTime && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50" aria-label="masa-berlaku">
          <span className="text-white text-lg">QR Code Telah Kedaluwarsa</span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 flex justify-center items-center ">
        {qrImage ? (
          <img
            src={qrImage}
            alt="Barcode-QRIS"
            className={`w-52 h-52 ${
              expiresTime ? "opacity-50" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-32 h-32 border border-dashed border-gray-400 flex items-center justify-center">
            <span>QR Code Tidak Tersedia</span>
          </div>
        )}
        </div>
        <div className="mt-2 text-base text-neutral-9" aria-label="masa-berlaku">
          {expiresTime ? `QR Code kadaluarsa` : `Sisa waktu: ${timeLeft}`}
        </div>
      </div>
    </div>
  );
};

export default QrisImage;
