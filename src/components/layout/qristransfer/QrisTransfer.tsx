import React, { useState, useEffect, useCallback, useRef } from "react";
import useQrisTransfer from "../../../../src/contexts/useQrisTransfer";
import useBankStatement from "../../../contexts/useBankStatement";
import { useAuth } from "../../../contexts/useAuth";
import html2canvas from "html2canvas";
import QrisInfo from "./qrisinfo";
import QrisButton from "./qrisbutton";
import QrisImage from "./qrisimage";
import Skeleton from "../../base/skeletonloading";
import logoQris from "../../../../public/logo qris.svg";
import { useTimeout } from "../../hooks/changeToTime";
import Swal from "sweetalert2";

const QrisTransfer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [expiresTime, setExpiresTime] = useState(false);
  const [buttonExpiredInfo, setButtonExpiredInfo] = useState(false);
  const [previousBalance, setPreviousBalance] = useState<number | null>(null); // State untuk saldo sebelumnya
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const { fetchLoginInfo } = useAuth();
  const { qrImage, generateQRIS, expiresAt } = useQrisTransfer();
  const timeLeft = useTimeout(expiresAt);
  const qrisTransferRef = useRef<HTMLDivElement | null>(null);
  const fetchQrisTransferRef = useRef(false);

  const fetchQrisTransfer = useCallback(async () => {
    try {
      await generateQRIS();
    } catch (err) {
      console.error("Error generating QRIS:", err);
    }
  }, [generateQRIS]);

  const handleRefresh = async () => {
    setButtonExpiredInfo(false);
    await fetchQrisTransfer();
    setExpiresTime(false);
  }

  const handleDownload = async () => {
    if (!qrisTransferRef.current) return;

    try {
      const canvas = await html2canvas(qrisTransferRef.current, {
        useCORS: true,
        scale: 2,
      });
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;

      const resizedCanvas = document.createElement("canvas");
      const ctx = resizedCanvas.getContext("2d");

      resizedCanvas.width = contentWidth;
      resizedCanvas.height = contentHeight;

      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
      }

      const imgData = resizedCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "qris-image.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PNG: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fetchQrisTransferRef.current) {
          await fetchQrisTransfer();
          fetchQrisTransferRef.current = true;
        }
        await fetchBankStatement();
        await fetchLoginInfo();
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchQrisTransfer, fetchBankStatement, fetchLoginInfo]);

  useEffect(() => {
    if (timeLeft === "Expired") {
      setExpiresTime(true);
    } else {
      setExpiresTime(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (bankStatement && previousBalance === null) {
      // Inisialisasi saldo sebelumnya saat data pertama kali diambil
      setPreviousBalance(bankStatement.accountInfo.balance.availableBalance.value);
    } else if (bankStatement) {
      const currentBalance = bankStatement.accountInfo.balance.availableBalance.value;

      if (previousBalance !== null && currentBalance > previousBalance) {
        const amountReceived = currentBalance - previousBalance;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Horee, ada uang masuk sebesar RP ${amountReceived.toLocaleString('id-ID')}`,
          showConfirmButton: false,
          timer: 2000
        });

        // Update saldo sebelumnya setelah notifikasi
        setPreviousBalance(currentBalance);
      }
    }
  }, [bankStatement, previousBalance]);

  return (
    <div
      className="bg-neutran-1 shadow-box rounded flex flex-col md:w-96 w-full p-5 gap-2.5 mt-16 md:mt-0"
      ref={qrisTransferRef}
    >
      <div
        className="flex justify-between items-center h-[55px] border-b"
        style={{ borderColor: "#0a3967" }}
      >
        <img src={logoQris} alt="logoQris" className="h-[24px]" />
      </div>
      <div className="flex flex-col justify-center text-center items-center">
        {loading ? (
          <Skeleton className="h-6 w-48" />
        ) : (
          <>
            <QrisInfo bankStatement={bankStatement || undefined} />
            <QrisImage
              qrImage={qrImage || undefined}
              expiresTime={expiresTime}
              timeLeft={timeLeft}
            />
            <QrisButton
              handleRefresh={handleRefresh}
              handleDownload={handleDownload}
              timeLeft={
                buttonExpiredInfo
                  ? `Masa Berlaku : ${timeLeft}`
                  : "QR berlaku untuk 1 kali transaksi"
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default QrisTransfer;
