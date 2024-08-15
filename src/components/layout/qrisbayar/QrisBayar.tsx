import React, { useState, useEffect } from "react";
import axios from "axios";
import useBankStatement from "../../../contexts/useBankStatement";
import useQrisBayar from "../../../contexts/useQrisBayar";
import PinModal from "../pinmodal";
import QrisModal from "./qrismodal";
import WrongPinModal from "../wrongpinmodal";
import BankStatementSection from "./qrisbayarhandler";
import { useTimeout } from '../../hooks/changeToTime';

const apiUrl1 = import.meta.env.VITE_API_URL;

interface pinConnect {
  data: {
    pinToken: string;
  };
}

const QrisBayar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalQrisOpen, setModalQrisOpen] = useState(false);
  const [modalWrongPin, setModalWrongPin] = useState(false);
  const [modalHandlePin, setModalHandlePin] = useState(false);
  const [modalHandleWrongPin, setModalHandleWrongPin] = useState(false);
  const [buttonText, setButtonText] = useState(true);
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const { qrImage, expiresAt, generateQRIS } = useQrisBayar();

  const fetchQrisBayar = async (getPinToken: string) => {
    try {
      await generateQRIS(10000, "IDR", getPinToken);
    } catch (err) {
      console.error('Error generating QRIS:', err);
    }
  };

  const timeLeft = useTimeout(expiresAt);

  const fetchPin = async (pinAuth: string): Promise<string> => {
    try {
      const response = await axios.post<pinConnect>(
        `${apiUrl1}/api/v1.0/auth/validate-pin`,
        { pin: pinAuth },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setError(null);
      console.log(error);
      return response.data.data.pinToken;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error:', err.message);
        console.error('Axios Error Data:', err.response?.data);
        setError(err.response?.data.message || "Failed to fetch PIN");
        return "pinSalah";
      } else {
        console.error('Unexpected Error:', err);
        setError("An unexpected error occurred");
      }
      return "";
    }
  };

  const handlePinChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (index < pin.length - 1 && value) {
        const nextInput = document.getElementById(`pin-input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (pin[index] === '') {
        if (index > 0) {
          const prevInput = document.getElementById(`pin-input-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }
      }
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
  }, [fetchBankStatement]);

  const handleStartQrisPay = () => {
    setModalOpen(true);
  };

  const handleConfirmPin = async () => {
    const pinFinal = pin.join("");
    const hasil = await fetchPin(pinFinal);

    if (pinFinal.length === 6 && hasil !== "pinSalah") {
      setModalHandlePin(false);
      await fetchQrisBayar(hasil);
      setModalQrisOpen(true);
      setButtonText(false);
      setModalOpen(false);
      setModalHandleWrongPin(false);
    }
    else if (pinFinal.length === 6 && hasil === "pinSalah") {
      setModalWrongPin(true);
      setModalOpen(false);
    }
    else {
      setModalHandlePin(true);
    }
    setPin(["", "", "", "", "", ""]);
  };

  const handleTryAgain = () => {
    setModalOpen(true);
    setModalWrongPin(false);
    setModalHandlePin(false);
    setModalHandleWrongPin(true);
  }

  const handleEndQrisPay = () => {
    setButtonText(true);
    setModalQrisOpen(false);
  }

  return (
    <div className="flex gap-[80px]">
      <BankStatementSection
        bankStatement={bankStatement}
        buttonText={buttonText}
        handleStartQrisPay={handleStartQrisPay}
        handleEndQrisPay={handleEndQrisPay}
        loading={loading}
      />

      <QrisModal
        isOpen={modalQrisOpen}
        qrImage={qrImage || ""}
        timeLeft={timeLeft}
      />

      <PinModal
        isOpen={modalOpen}
        pin={pin}
        handlePinChange={handlePinChange}
        handleKeyDown={handleKeyDown}
        handleConfirmPin={handleConfirmPin}
        modalHandlePin={modalHandlePin}
        modalHandleWrongPin={modalHandleWrongPin}
      />

      <WrongPinModal
        isOpen={modalWrongPin}
        handleTryAgain={handleTryAgain}
      />
    </div>
  );
};

export default QrisBayar;
