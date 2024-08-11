import React, { useState, useEffect } from "react";
import logoQris from "../../../../public/logo qris.svg";
import logoClose from "../../../../public/closebutton.svg";
import logoBca from "../../../../public/LogoBCA.png";
import logoShare from "../../../../public/share.svg";
import logoDownload from "../../../../public/download.svg";
import logoRefresh from "../../../../public/refresh.svg";
import useBankStatement from "../../../contexts/useBankStatement";
import useQrisTransfer from '../../../../src/contexts/useQrisTransfer';
import Skeleton from "../../base/skeletonloading";

const QrisTransfer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [nominal, setNominal] = useState<string>("");
  const [buttonText, setButtonText] = useState("Tambah Detail QRIS");
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const { qrImage, expiresAt, generateQRIS, error } = useQrisTransfer();

  const fetchQrisTransfer = async () => {
    try {
      await generateQRIS(price, "IDR");
    } catch (err) {
      console.error('Error generating QRIS:', err);
    }
  };

  const handleQrisTransfer = async () => {
    setButtonText(formatToIDR(price));
    setModalOpen(false);
    await fetchQrisTransfer();
  };

  const handleRefresh = async () => {
    setNominal("");
    setPrice(0);
    setButtonText("Tambah Detail QRIS");
    await fetchQrisTransfer();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchBankStatement()]);
        await fetchQrisTransfer();
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchBankStatement]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formatToIDR = (value: number) => {
    return `Rp.${value.toLocaleString("id-ID")}.00`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString("id-ID");
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/[^0-9]/g, "");
    if (cleanedValue === "") {
      setNominal("");
      setPrice(0);
    } else {
      const numberValue = parseFloat(cleanedValue);

      if (!isNaN(numberValue)) {
        setPrice(numberValue);
        setNominal(formatNumber(numberValue));
      } else {
        setNominal(cleanedValue);
        setPrice(0);
      }
    }
  };

  return (
    <div className="bg-primary-light-blue rounded-[20px] rounded flex flex-col w-96 p-5 gap-2.5">
      <div className="flex justify-between h-14 border-b border-primary-dark-blue">
        <img src={logoQris} alt="logoQris" />
        <img src={logoBca} alt="logoBca" />
      </div>
      <div className="flex flex-col justify-center text-center items-center">
        {loading ? (
          <>
            <Skeleton className="h-6 w-48" />
            <div className="flex flex-row gap-4">
              <Skeleton className="h-5 w-40" />
            </div>
          </>
        ) : (
          <>
            {bankStatement && (
              <>
                <div className="text-lg text-primary-dark-blue font-bold">
                  {bankStatement.accountInfo.name}
                </div>
                <div className="text-base text-primary-dark-blue">
                  BCA -&nbsp;{bankStatement.accountInfo.accountNo}
                </div>
              </>
            )}
            <img
              src={qrImage  || undefined }
              className="mt-[28px]"
              style={{ width: '150px', height: '150px' }}
              alt="logoQrisTransfer"
            />
            <button
              onClick={handleOpenModal}
              className="flex mt-[24px] text-sm text-primary-blue w-[175px] justify-center items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
            >
              {buttonText}
            </button>
            <div className="text-base mt-[12px] text-primary-dark-blue">
              QR berlaku untuk 1 kali transaksi
            </div>
            <div className="flex justify-between mt-[24px] w-[100%]">
              <div className="flex justify-between w-[98px]">
                <img src={logoShare} aria-label="Tombol Bagikan Qris" alt="shareQrisTf" />
                <img src={logoDownload} aria-label="Tombol Unduh Qris" alt="downloadQrisTf" />
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
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-primary-light-blue rounded-[20px] rounded flex flex-col w-96 p-5 gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between h-14 border-b border-primary-dark-blue">
              <img src={logoBca} alt="logoBca" />
              <img
                src={logoClose}
                style={{ height: "30px", marginTop: "10px", cursor: "pointer" }}
                alt="close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="flex justify-between mt-[24px] mb-[24px]">
              <div className="text-lg text-primary-blue">Nominal</div>
              <input
                className="h-8 w-[200px]"
                value={nominal}
                type="text"
                maxLength={12}
                onChange={handleNominalChange}
              />
            </div>
            <button
              onClick={handleQrisTransfer}
              className="text-sm text-primary-blue w-[100%] justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrisTransfer;
