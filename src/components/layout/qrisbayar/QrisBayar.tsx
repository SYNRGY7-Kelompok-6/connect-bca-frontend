import React, { useState, useEffect } from "react";
import logoQris from "../../../../public/logo qris.svg";
import logoBca from "../../../../public/LogoBCA.png";
import useBankStatement from "../../../contexts/useBankStatement";
import Skeleton from "../../base/skeletonloading";
import axios from "axios";
import wrongPin from "../../../../public/WrongPin.svg";

const apiUrl2 = import.meta.env.VITE_API_URL_2;
const apiUrl1 = import.meta.env.VITE_API_URL;

interface qrisBayar {
  data: {
    qrImage: string,
    expiresAt: number
  }
}

interface pinConnect {
  data: {
    pinToken: string
  }
}

const QrisBayar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalQrisOpen, setModalQrisOpen] = useState(false);
  const [modalWrongPin, setModalWrongPin] = useState(false);
  const [modalHandlePin, setModalHandlePin] = useState(false);
  const [price, setPrice] = useState<number>(1000);
  const [qrImage, setQrImage] = useState("");
  const [qrExpires, setQrExpires] = useState<number>(0);
  const [nominal, setNominal] = useState<string>("");
  const [buttonText, setButtonText] = useState(true);
  const { bankStatement, fetchBankStatement } = useBankStatement();
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const fetchQrisBayar = async (pinToken: string) => {
    try {
      const response = await axios.post<qrisBayar>(
        `${apiUrl2}/api/v1.0/qr/qr-pay`,
        {
          amount: {
            value: 10000,
            currency: 'IDR',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'X-PIN-TOKEN': pinToken,
          },
        }
      );
      setModalQrisOpen(true);
      setQrImage(response.data.data.qrImage);
      setQrExpires(response.data.data.expiresAt);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error:', err.response?.status);
        console.error('Axios Error Data:', err.response?.data);
        setError(err.response?.data.message || "Failed to qris payment");
      } else {
        console.error('Unexpected Error:', err);
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (qrExpires !== null) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = qrExpires - now;

        if (distance < 0) {
          clearInterval(interval);
          setTimeLeft('Expired');
        } else {
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [qrExpires]);

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
      console.log(response.data.data.pinToken);
      setError(null);
      return response.data.data.pinToken
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error:', err.message);
        console.error('Axios Error Response:', err.response?.status);
        console.error('Axios Error Data:', err.response?.data);
        setError(err.response?.data.message || "Failed to fetch PIN");
        return "pinSalah"
      } else {
        console.error('Unexpected Error:', err);
        setError("An unexpected error occurred");
      }
      return ""
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
    console.log(hasil);
    if (pinFinal.length === 6 && hasil !== "pinSalah") {
      setModalHandlePin(false);
      await fetchQrisBayar(hasil);
      setButtonText(false);
      setModalOpen(false);
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
  }

  const handleEndQrisPay = () => {
    setButtonText(true);
    setModalQrisOpen(false);
  }

  const formatToIDR = (value: number) => {
    return `Rp.${value.toLocaleString("id-ID")}.00`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString("id-ID");
  };

  return (
    <div className="flex gap-[80px]">
      <div className="bg-primary-light-blue rounded-[20px] h-[422px] rounded flex flex-col p-5 gap-2.5">
        <div className="text-base text-primary-blue mb-[18px]">
          Dari Rekening
        </div>
        {bankStatement && (
          <div className="text-base text-primary-blue bg-white rounded-[10px] mb-[24px] border border-primary-blue border-[1px] w-[366px] h-[40px] pt-2 pr-3 pb-2 pl-3">
            {bankStatement.accountInfo.accountNo}&nbsp;-&nbsp;
            <span className="text-base text-primary-dark-blue">
              Tahapan Xpresi - IDR
            </span>
          </div>)}

        <div className="mb-[24px] w-[100%]">
          <div className="text-base text-primary-blue mb-[12px]">Catatan</div>
          <div className="flex w-[367px]">
            <div className="w-[12px] h-[12px] rounded-[50px] bg-primary-dark-blue mt-[6px]">
            </div>
            <div className="ml-[12px] text-base text-primary-blue w-[343px]">
              QRIS akan ditampikan untuk melakukan pembayaran
            </div>
          </div>
          <div className="flex w-[367px]">
            <div className="w-[12px] h-[12px] rounded-[50px] bg-primary-dark-blue mt-[6px]">
            </div>
            <div className="text-base ml-[12px] text-primary-blue w-[343px]">
              Pastikan nominal transaksi sudah sesuai. Transaksi dengan QRIS akan langsung mendebet rekening anda
            </div>
          </div>
        </div>
        {buttonText ?
          (<button
            onClick={handleStartQrisPay}
            className="text-[18px] text-white bg-primary-blue w-[100%] justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            aria-label="Tombol Lanjutkan"
          >
            Lanjutkan
          </button>) : (
            <button
              onClick={handleEndQrisPay}
              className="text-[18px] text-white bg-primary-blue w-[100%] justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Selesai
            </button>
          )}

      </div>
      {modalQrisOpen && (
        <div className="bg-primary-light-blue rounded-[20px] rounded flex flex-col w-96 p-5">
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
                <img
                  src={qrImage}
                  className="mt-[12px] mb-[24px]"
                  style={{ width: '300px', height: '300px' }}
                  alt="logoQrisTransfer"
                  aria-label="Barcode Qris"
                />
                <div className="text-base text-primary-blue">
                  Masa Berlaku : {timeLeft}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50" aria-label="Pop up masukan pin">
          <div className="bg-primary-light-blue rounded-[20px] w-[511px] rounded p-[30px] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}>
            <div className="text-center text-lg text-primary-dark-blue mb-[26px]">
              <strong>Masukan PIN Anda</strong>
            </div>
            <div className="w-[460px] h-[50px] mb-[36px] flex justify-between px-2" aria-label="Kolom pin">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(event) => handlePinChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  maxLength={1}
                  className={`w-12 h-12 text-primary-dark-blue rounded-full border-primary-dark-blue border-[2px] ${digit ? 'bg-primary-dark-blue' : 'bg-white'}`}
                />
              ))}
            </div>
            {modalHandlePin && (
              <div className="text-base text-center"
                style={{
                  color: "red",
                  position: "absolute",
                  top: "51.8%",
                }}>
                PIN harus 6 digit
              </div>
            )}
            <button
              onClick={handleConfirmPin}
              className="text-base text-white bg-primary-blue w-[203px] border rounded-[12px] border-primary-blue pt-[10px] pr-[60px] pb-[10px] pl-[60px]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              aria-label="Tombol Konfirmasi"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      )}
      {modalWrongPin && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-[20px] h-[362px] w-[416px] rounded p-[36px] flex flex-col items-center">
            <img src={wrongPin} className="mb-[42.75px]" />

            <div className="text-center text-base w-[325px] mb-[24px]">
              PIN yang anda masukan salah, silahkan coba kembali
            </div>
            <button
              onClick={handleTryAgain}
              className="text-[18.34px] text-white bg-primary-blue w-[100%] border rounded-[12px] border-primary-blue pt-[10px] pr-[60px] pb-[10px] pl-[60px]"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Coba Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default QrisBayar;
