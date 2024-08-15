import React from "react";
import { useAuth } from "../../../contexts/useAuth";
import useBankStatement from "../../../contexts/useBankStatement";

const InfoAkun: React.FC = () => {
  const { bankStatement } = useBankStatement();
  const { loginInfo } = useAuth();

  return (
    <div className="flex flex-col mt-5 md:mt-10 shadow-box w-full lg:w-[416px]">
      <h1 className="bg-primary-dark-blue w-full lg:w-[416px] p-[18px] text-md text-white font-bold rounded-t" aria-label="informasi akun">
        Informasi Akun
      </h1>
      {!loginInfo || !bankStatement ? (
        <div className="text-white">No data available</div>
      ) : (
        <div className="bg-neutral-1 flex flex-col rounded-b- p-[18px] gap-[7px]">
          <div className="flex gap-2">
            <p className="w-48 lg:w-[215px] text-primary-dark-blue text-sm font-semibold">
              Masa Berlaku Pin (hari)
            </p>
            <p className="text-primary-dark-blue text-sm font-semibold">
              : {bankStatement.accountInfo.pinExpiredTimeLeft}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-48 lg:w-[215px] text-primary-dark-blue text-sm font-semibold">
              Tanggal Terakhir Gagal Login
            </p>
            <p className="text-primary-dark-blue text-sm font-semibold">
              :{" "}
              {new Date(
                loginInfo.failedLoginAttempt.timestamp
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-48 lg:w-[215px] text-primary-dark-blue text-sm font-semibold">
              Lokasi Terakhir Akun Terhubung
            </p>
            <p className="text-primary-dark-blue text-sm font-semibold">
              : {loginInfo.lastSuccessfullLoginAttempt.location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoAkun;