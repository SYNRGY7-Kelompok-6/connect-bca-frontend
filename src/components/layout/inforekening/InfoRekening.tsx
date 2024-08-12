import React from "react";
import InfoCVV from "../infocvv";
import InfoAkun from "../infoakun/InfoAkun";
import useBankStatement from "../../../contexts/useBankStatement";

export interface InfoRekeningProps {
  showInfoCVV?: boolean;
  showInfoAkun?: boolean;
}

const InfoRekening: React.FC<InfoRekeningProps> = ({
  showInfoCVV = false,
  showInfoAkun = false,
}) => {
  const { bankStatement } = useBankStatement();
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);

  const balanceValue =
    bankStatement?.accountInfo?.accountBalance?.availableBalance?.value || 0;
  const balance = balanceValue.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <section className="flex flex-col" aria-labelledby="rekening-info-heading">
      <div className="bg-neutral-1 flex flex-col w-[416px] shadow-box rounded">
        <h1
          id="rekening-info-heading"
          className="bg-primary-dark-blue w-[416px] p-[18px] text-md text-white font-bold rounded-t"
        >
          Informasi Rekening
        </h1>
        <div className="flex flex-col gap-[18px] p-[18px]">
          <div className="flex flex-col">
            <p className="text-primary-dark-blue text-sm font-semibold">
              Rekening
            </p>
            <div className="flex justify-between" aria-label="Nomor Rekening">
              <h2 className="text-md text-primary-dark-blue font-semibold">
                {bankStatement?.accountInfo?.accountNo || ""}
              </h2>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-primary-dark-blue text-sm font-semibold">
              Saldo
            </p>
            <div
              className="flex justify-between items-center"
              aria-label="Saldo Rekening"
            >
              <h2 className="text-md text-primary-dark-blue font-semibold">
                {isBalanceVisible ? balance : "IDR ********"}
              </h2>
              <button
                type="button"
                onClick={toggleBalanceVisibility}
                aria-label={
                  isBalanceVisible ? "Sembunyikan Saldo" : "Tampilkan Saldo"
                }
              >
                <img
                  src={
                    isBalanceVisible
                      ? "/VisibilityOn.svg"
                      : "/VisibilityOff.svg"
                  }
                  alt={
                    isBalanceVisible ? "Sembunyikan saldo" : "Tampilkan saldo"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showInfoCVV && <InfoCVV />}
      {showInfoAkun && <InfoAkun />}
    </section>
  );
};

export default InfoRekening;
