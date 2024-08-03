import React, { useState, useEffect } from "react";
import DropdownMonth from "../../base/dropdownmonth/DropdownMonth";
import useBankStatement from "../../../contexts/useBankStatement";

const LaporanKeuangan: React.FC = () => {
  const { monthlyBankStatement, fetchAccountMonthly } = useBankStatement();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAccountMonthly(selectedMonth);
      } catch (error) {
        console.error("Error fetching monthly bank statement:", error);
      }
    };

    fetchData();
  }, [fetchAccountMonthly, selectedMonth]);

  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month);
  };

  const monthlyIncome = Number(monthlyBankStatement?.monthlyIncome.value ?? 0);
  const monthlyOutcome = Number(
    monthlyBankStatement?.monthlyOutcome.value ?? 0
  );
  const selisih = monthlyIncome - monthlyOutcome;

  return (
    <section
      className="flex flex-col gap-[20px] w-[500px]"
      aria-labelledby="financial-report-heading"
    >
      <header>
        <h1
          id="financial-report-heading"
          className="text-lg text-white font-bold"
        >
          Laporan Keuangan Rekening
        </h1>
      </header>
      <div
        className="flex flex-col gap-8 bg-primary-light-blue p-8 justify-center items-center rounded-[20px]"
        aria-labelledby="financial-report-details"
      >
        <div className="inline-flex rounded-md shadow-sm w-full">
          <DropdownMonth onSelectMonth={handleSelectMonth} />
        </div>
        <div
          className="flex flex-col gap-1 items-center"
          aria-labelledby="balance-difference"
        >
          <p className="text-neutral-9 font-medium text-sm">Selisih</p>
          <h3 className="text-neutral-9 font-bold text-lg">
            Rp {selisih.toLocaleString()}
          </h3>
        </div>
        <div
          className="flex justify-center gap-10"
          aria-labelledby="income-expense-details"
        >
          <div
            className="flex flex-col items-center"
            aria-labelledby="income-details"
          >
            <div className="flex gap-2">
              <img
                src="/ArrowPemasukan.svg"
                alt="Ikon Pemasukan"
                aria-label="Ikon Pemasukan"
              />
              <p className="text-neutral-9 font-medium text-sm">Pemasukan</p>
            </div>
            <h3 className="text-secondary-green text-lg font-bold">
              Rp {monthlyIncome.toLocaleString()}
            </h3>
          </div>
          <div
            className="flex flex-col items-center"
            aria-labelledby="expense-details"
          >
            <div className="flex gap-2">
              <img
                src="/ArrowPengeluaran.svg"
                alt="Ikon Pengeluaran"
                aria-label="Ikon Pengeluaran"
              />
              <p className="text-neutral-9 font-medium text-sm">Pengeluaran</p>
            </div>
            <h3 className="text-secondary-red text-lg font-bold">
              Rp {monthlyOutcome.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaporanKeuangan;
