import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Popup from "../popup";

const FormLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); 
  const [isPopupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };
  const hidePopup = () => {
    setPopupVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
      alert("Login successful");
      navigate("/beranda");
    } catch (error) {
      setShowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
  };

  const handleClosePopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="flex flex-col bg-[#00487B] w-[874px] py-[16px] px-[32px] rounded-[20px]">
      <h2 className="font-semibold text-[20px] text-white mx-auto">
        Selamat Datang di Internet Banking Connect by BCA
      </h2>
      <div className="flex flex-row mt-[40px]">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-[16px]">
              <label
                className="block text-sm text-white mb-[9px] px-[14px]"
                htmlFor="userID"
              >
                UserID
              </label>
              <input
                className="border rounded-[18px] py-[4px] px-[16px] w-[300px] text-sm"
                id="userID"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="userID"
                placeholder="Masukan User ID Anda"
                autoComplete="username"
                aria-describedby="Kolom Masukkan USER ID"
              />
            </div>
            <div className="mb-[22px]">
              <label
                className="block text-sm text-white mb-[9px] px-[14px]"
                htmlFor="pin"
              >
                Password
              </label>
              <input
                className="border rounded-[18px] py-[4px] px-[16px] w-[300px] text-sm"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan Pasword Anda"
                autoComplete="current-password"
                aria-describedby="Kolom Password"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                className="bg-primary-dark-blue text-sm text-white font-medium py-[4px] px-[32px] rounded-[16px] w-[125px] flex items-center justify-center"
                type="submit"
                disabled={isLoading}
                aria-label="Tombol masuk akun"
              >
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  "Masuk"
                )}
              </button>
              <button
                className="bg-secondary-red text-sm text-white font-medium py-[4px] px-[16px] rounded-[16px] w-[125px]"
                type="button"
                onClick={handleReset}
                aria-label="Tombol menghapus semua isian di kolom"
              >
                Reset
              </button>
            </div>
          </form>
          <div className="flex gap-[21px] mt-[35px] justify-center">
            <button
              type="button"
              aria-label="Tombol lupa User ID"
              className="flex items-center gap-[7px]"
              onClick={showPopup}
            >
              <div className="bg-white p-[8px] rounded-[8px]">
                <img src="/Profil.svg" alt="Tombol lupa User ID" />
              </div>
              <p className="text-xs font-bold text-white underline">
                Lupa UserID ?
              </p>
            </button>

            <button
              type="button"
              aria-label="Tombol lupa pin"
              className="flex items-center gap-[7px]"
              onClick={showPopup}
            >
              <div className="bg-white p-[8px] rounded-[8px]">
                <img src="/ForgotPIN.svg" alt="Tombol lupa pin" />
              </div>
              <p className="text-xs font-bold text-white underline">
                Lupa Pin?
              </p>
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-[90px]">
          <p className="text-sm text-white text-justify w-[320px]">
            Informasi :<br />
            USER ID dan PIN Internet Banking dapat diperoleh pada saat Anda
            melakukan Registrasi Internet melalui ATM BCA.
            <br />
            <br />
            Untuk informasi lebih lanjut hubungi Halo BCA 1500888.
          </p>
          <div className="flex mt-[40px] justify-between">
            <div>
              <h2 className="text-md text-white font-semibold">Fast Menu</h2>
              <div className="flex gap-[40px] mt-[10px]">
                <button
                  type="button"
                  aria-label="Tombol transfer"
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-[8px] rounded-[8px]">
                    <img src="/Transfer.svg" alt="Transfer" />
                  </div>
                  <p className="text-xs text-white font-semibold">Transfer</p>
                </button>
                <button
                  type="button"
                  aria-label="Tombol Menampilkan QRIS Bayar"
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-[8px] rounded-[8px]">
                    <img src="/QRIS.svg" alt="QRIS Bayar" />
                  </div>
                  <p className="text-xs text-white font-semibold">QRIS Bayar</p>
                </button>
                <button
                  type="button"
                  aria-label="Tombol Menampilkan Saldo Pada Rekening"
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-[8px] rounded-[8px]">
                    <img src="/InfoSaldo.svg" alt="Info Saldo" />
                  </div>
                  <p className="text-xs text-white font-semibold">Info Saldo</p>
                </button>
              </div>
            </div>
            <div className="w-[80px]">
              <img src="/digicert.png" alt="Digicert Logo" />
            </div>
          </div>
        </div>
      </div>
      {showErrorPopup && (
        <Popup
          message={error || "Terjadi kesalahan saat melakukan permintaan."}
          svgSrc="/ForgotUserID.svg" 
          svgAlt="Error Icon"
          labelPopup="Pop up salah user id/kata sandi"
          labelButton="Tombol kembali dan mengisi ulang user id/kata sandi"
          buttonText="Ulangi"
          onButtonClick={handleClosePopup}
        />
      )}
      {isPopupVisible && (
        <Popup
          message="Segera perbarui User ID / Kata Sandi melalui layanan bank terdekat atau hubungi customer service kami melalui email halobca@bca.co.id"
          svgSrc="/ForgotUserID.svg"
          svgAlt="Logo Lupa User Id"
          labelButton="Tombol kembali mengisi form login"
          labelPopup="Pop Up Lupa USER ID & Kata Sandi Internet Banking"
          buttonText="Kembali"
          onButtonClick={hidePopup}
        />
      )}
    </div>
  );
};

export default FormLogin;
