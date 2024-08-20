import React, { useState, useEffect, useCallback } from "react";
import useBankStatement from "../../../contexts/useBankStatement";
import useQrisTransfer from '../../../../src/contexts/useQrisTransfer';
import html2canvas from "html2canvas";
import QrisModal from './qrismodal';
import QrisInfo from './qrisinfo';
import QrisImage from './qrisimage';
import QrisButton from './qrisbutton';
import Skeleton from "../../base/skeletonloading";
import logoQris from "../../../../public/logo qris.svg";
import { formatToIDR, formatNumber } from '../../hooks/formatRp';
import { useTimeout } from '../../hooks/changeToTime';

const QrisTransfer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [expiresTime, setExpiresTime] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [nominal, setNominal] = useState<string>("");
  const [buttonText, setButtonText] = useState("Tambah Detail QRIS");
  const [buttonExpiredInfo, setButtonExpiredInfo] = useState(false)
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const { qrImage, generateQRIS, expiresAt } = useQrisTransfer();

  const timeLeft = useTimeout(expiresAt);

  const fetchQrisTransfer = useCallback(async () => {
    try {
      await generateQRIS(price, "IDR");
    } catch (err) {
      console.error('Error generating QRIS:', err);
    }
  }, [generateQRIS, price]);

  const handleQrisTransfer = async () => {
    setButtonText(formatToIDR(price));
    setButtonExpiredInfo(true);
    setModalOpen(false);
    setExpiresTime(true);
    await fetchQrisTransfer();
  };

  const handleRefresh = async () => {
    setNominal("");
    setButtonText("Tambah Detail QRIS");
    setButtonExpiredInfo(false);
    await fetchQrisTransfer();
    setExpiresTime(false);
  };

  const handleDownload = async () => {
    const element = document.querySelector(".png-selector") as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = imgData;
      link.download = "qris.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchBankStatement()]);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchBankStatement, fetchQrisTransfer]);

  useEffect(() => {
    console.log("Expires At:", expiresAt);
    console.log("Time Left:", timeLeft);
  }, [expiresAt, timeLeft]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
    <>
      <div className="png-selector bg-neutran-1 shadow-box rounded flex flex-col md:w-96 w-full p-5 gap-2.5 mt-16 md:mt-0">
        <div className="flex justify-between items-center h-[55px] border-b"
          style={{
            borderColor: '#0a3967'
          }}>
          <img src={logoQris} alt="logoQris" className="h-[24px]" />
        </div>
        <div className="flex flex-col justify-center text-center items-center">
          {loading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <>
              <QrisInfo bankStatement={bankStatement || undefined} />
              <QrisImage qrImage={qrImage || undefined} expiresTime={expiresTime} />
              <QrisButton
                buttonText={buttonText}
                handleOpenModal={handleOpenModal}
                handleRefresh={handleRefresh}
                handleDownlaod={handleDownload}
                timeLeft={buttonExpiredInfo ? `Masa Berlaku : ${timeLeft}` : "QR berlaku untuk 1 kali transaksi"}
              />
            </>
          )}
        </div>
      </div>
      <div>
        {modalOpen && (
          <QrisModal
            handleCloseModal={handleCloseModal}
            handleQrisTransfer={handleQrisTransfer}
            nominal={nominal}
            handleNominalChange={handleNominalChange}
          />
        )}
      </div>
    </>
  );
};

export default QrisTransfer;