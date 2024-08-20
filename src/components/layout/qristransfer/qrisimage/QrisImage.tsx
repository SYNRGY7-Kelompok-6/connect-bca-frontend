import React from 'react';

interface QrisImageProps {
  qrImage?: string;
  expiresTime: boolean;
}

const QrisImage: React.FC<QrisImageProps> = ({ qrImage, expiresTime }) => (
  <>
    {expiresTime ? (
      <img
        src={qrImage}
        className="mt-[28px]"
        style={{ width: '150px', height: '150px' }}
        alt="logoQrisTransfer"
        aria-label="Qris Transfer"
      />
    ) : (
      <div
        className="mt-[28px] text-primary-dark-blue text-base"
        style={{ width: '150px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}
      >
        <div className='w-[100px]'
          aria-label="Silahkan Masukan Nominal">
          Silahkan Masukan Nominal
        </div>
      </div>
    )}
  </>
);

export default QrisImage;
