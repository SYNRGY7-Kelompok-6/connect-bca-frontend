import React from 'react';
import qrcode from "../../../../../public/QR Code.svg";

interface QrisImageProps {
  qrImage?: string;
  expiresTime: boolean;
}

const QrisImage: React.FC<QrisImageProps> = ({ qrImage, expiresTime }) => (
  <img
    src={expiresTime ? qrImage : qrcode}
    className="mt-[28px]"
    style={{ width: '150px', height: '150px' }}
    alt="logoQrisTransfer"
  />
);

export default QrisImage;
