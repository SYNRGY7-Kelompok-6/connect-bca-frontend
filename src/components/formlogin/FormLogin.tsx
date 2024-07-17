import React from "react";

const FormLogin: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleReset = () => {};

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
                name="userID"
                placeholder="Masukan User ID Anda"
                autoComplete="username"
              />
            </div>
            <div className="mb-[22px]">
              <label
                className="block text-sm text-white mb-[9px] px-[14px]"
                htmlFor="pin"
              >
                Pin Internet Banking
              </label>
              <input
                className="border rounded-[18px] py-[4px] px-[16px] w-[300px] text-sm"
                id="pin"
                type="password"
                name="pin"
                placeholder="Masukan Pin Internet Banking Anda"
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                className="bg-primary-dark-blue text-sm text-white font-medium py-[4px] px-[32px] rounded-[16px] w-[125px]"
                type="submit"
              >
                Masuk
              </button>
              <button
                className="bg-secondary-red text-sm text-white font-medium py-[4px] px-[16px] rounded-[16px] w-[125px]"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
          <div className="flex gap-[21px] mt-[35px] justify-center">
            <div className="flex items-center gap-[7px]">
              <button type="button" aria-label="Lupa User ID">
                <div className="bg-white p-[8px] rounded-[8px]">
                  <img src="/Profil.svg" alt="Lupa User ID" />
                </div>
              </button>
              <p className="text-xs font-bold text-white underline">
                Lupa User ID?
              </p>
            </div>
            <div className="flex items-center gap-[7px]">
              <button type="button" aria-label="Lupa Pin">
                <div className="bg-white p-[8px] rounded-[8px]">
                  <img src="/ForgotPIN.svg" alt="Lupa Pin" />
                </div>
              </button>
              <p className="text-xs font-bold text-white underline">
                Lupa Pin?
              </p>
            </div>
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
                <button type="button" className="flex flex-col items-center">
                  <div className="bg-white p-[8px] rounded-[8px]">
                    <img src="/Transfer.svg" alt="Transfer" />
                  </div>
                  <p className="text-xs text-white font-semibold">Transfer</p>
                </button>
                <button type="button" className="flex flex-col items-center">
                  <div className="bg-white p-[8px] rounded-[8px]">
                    <img src="/QRIS.svg" alt="QRIS Bayar" />
                  </div>
                  <p className="text-xs text-white font-semibold">QRIS Bayar</p>
                </button>
                <button type="button" className="flex flex-col items-center">
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
    </div>
  );
};

export default FormLogin;
