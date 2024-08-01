import React  from "react";
import { useAuth } from "../../../contexts/useAuth";
import useBankStatement from "../../../contexts/useBankStatement";

const InfoAkun: React.FC = () => {
  const { bankStatement } = useBankStatement();
  const { loginInfo } = useAuth();

  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-lg text-white font-bold" aria-label="informasi akun">Informasi Akun</h1>
      {!loginInfo || !bankStatement ? (
        <div className="text-white">No data available</div>
      ) : (
        <div className="bg-primary-light-blue flex flex-col w-[416px] rounded-[20px] p-[18px] gap-[7px]">
          <div className="flex gap-2">
            <p className="w-[215px] text-primary-dark-blue text-sm font-semibold">
              Masa Berlaku Pin (hari)
            </p>
            <p className="text-primary-dark-blue text-sm font-semibold">
              : {bankStatement.accountInfo.pinExpiredTimeLeft}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-[215px] text-primary-dark-blue text-sm font-semibold">
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
            <p className="w-[215px] text-primary-dark-blue text-sm font-semibold">
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
