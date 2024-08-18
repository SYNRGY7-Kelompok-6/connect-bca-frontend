import React, { useState } from "react";
import { useAuth } from "../../../contexts/useAuth";
import Popup from "../../base/popup";
import ButtonIcon from "../../base/buttonicon";
import Button from "../../base/button";

const FormLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errors, setErrors] = React.useState<{
    username?: string;
    password?: string;
  }>({});

  const showPopup = () => {
    setPopupVisible(true);
  };
  const hidePopup = () => {
    setPopupVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { username?: string; password?: string } = {};
    if (!username) {
      newErrors.username = "User ID tidak boleh kosong.";
    }
    if (!password) {
      newErrors.password = "Password harus lebih dari 8 karakter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
    } catch (error) {
      setShowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setErrors({});
  };

  const handleClosePopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="flex flex-col bg-neutral-1 border border-neutral-3 lg:w-[805px] w-full py-10 px-10 rounded-[20px] shadow-box order-2 lg:order-1">
      <h2 className="font-semibold md:text-md text-[18px] text-neutral-9 text-center border-b-2 border-neutral-3 pb-3">
        Selamat Datang di Internet Banking Connect by BCA
      </h2>
      <div className="flex md:flex-row flex-col mt-[40px] gap-[60px]">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-[16px]">
              <label
                className="block text-base font-semibold text-neutral-9 mb-[9px] px-[14px]"
                htmlFor="userID"
              >
                UserID
              </label>
              <input
                className="border border-neutral-3 focus:outline-none focus:ring focus:border-primary-blue rounded-lg py-2 px-3 w-[300px] text-sm"
                id="userID"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="userID"
                placeholder="Masukan User ID Anda"
                autoComplete="username"
                aria-describedby="Kolom Masukkan USER ID"
              />
              {errors.username && (
                <p className="text-secondary-red text-sm font-medium">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="mb-[22px]">
              <label
                className="block text-base font-semibold text-neutral-9 mb-[9px] px-[14px]"
                htmlFor="pin"
              >
                Password
              </label>
              <input
                className="border border-neutral-3 focus:outline-none focus:ring focus:border-primary-blue rounded-lg py-2 px-3 w-[300px] text-sm"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan Pasword Anda"
                autoComplete="current-password"
                aria-describedby="Kolom Password"
              />
              {errors.password && (
                <p className="text-secondary-red text-sm font-medium">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex gap-6 items-center">
              <Button
                type="submit"
                ariaLabel="Tombol masuk akun"
                variant="micro"
                colorScheme="primary"
                state="active"
                isLoading={isLoading}
              >
                {isLoading ? (
                  <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  "Masuk"
                )}
              </Button>

              <Button
                type="button"
                onClick={handleReset}
                ariaLabel="Tombol menghapus semua isian di kolom"
                variant="micro"
                colorScheme="reset"
                state="active"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-neutral-9 text-justify lg:w-[320px]">
            Informasi :<br />
            USER ID dan PIN Internet Banking dapat diperoleh pada saat Anda
            melakukan Registrasi Internet melalui ATM BCA.
            <br />
            <br />
            Untuk informasi lebih lanjut hubungi Halo Connect 1500888.
          </p>
          <div className="flex gap-9 mt-[35px] justify-center">
            <ButtonIcon
              ariaLabel="Tombol lupa User ID"
              onClick={showPopup}
              imgSrc="/Profil.svg"
              imgAlt="Tombol lupa User ID"
              text="Lupa UserID ?"
              textClassName=""
              containerClassName="w-full flex-col md:flex-row"
            />

            <ButtonIcon
              ariaLabel="Tombol lupa pin"
              onClick={showPopup}
              imgSrc="/ForgotPIN.svg"
              imgAlt="Tombol lupa pin"
              text="Lupa Kata Sandi?"
              textClassName=""
              containerClassName="w-full flex-col md:flex-row"
            />
          </div>
        </div>
      </div>
      {showErrorPopup && (
        <Popup
          message={error || "Terjadi kesalahan saat melakukan permintaan."}
          svgSrc="/ForgotUserID.svg"
          svgAlt="Error Icon"
          labelButton="Tombol ulangi"
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
          buttonText="Kembali"
          onButtonClick={hidePopup}
        />
      )}
    </div>
  );
};

export default FormLogin;
