import React, { useState, useEffect } from "react";
import DropdownMonth from "../../base/dropdownmonth/DropdownMonth";
import useBankStatement from "../../../contexts/useBankStatement";
import { PieChart } from "@mui/x-charts/PieChart";

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

  const pieData = [
    { id: 0, label: "Pemasukan", value: monthlyIncome },
    { id: 1, label: "Pengeluaran", value: monthlyOutcome },
  ];

  return (
    <section
      className="flex flex-col w-[500px] shadow-box h-fit"
      aria-labelledby="financial-report-heading"
    >
      <h1
        id="financial-report-heading"
        className="text-md text-white font-bold bg-primary-dark-blue p-[18px]"
      >
        Laporan Keuangan Rekening
      </h1>
      <div
        className="flex flex-col bg-neutral-1 px-10 py-[18px] gap-[18px] justify-center items-center rounded"
        aria-labelledby="financial-report-details"
      >
        <div className="inline-flex rounded-md w-full">
          <label htmlFor="month-select" className="sr-only">
            Pilih Bulan
          </label>
          <DropdownMonth onSelectMonth={handleSelectMonth} />
        </div>
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex justify-center items-center">
            <PieChart
              aria-label="Grafik Pie yang menunjukkan perbandingan pemasukan dan pengeluaran"
              width={185}
              height={185}
              series={[
                {
                  data: pieData.map((item) => ({
                    id: item.id,
                    value: item.value,
                  })),
                  cx: 90,
                  innerRadius: 90,
                },
              ]}
              colors={["#12D79C", "#CB3A31"]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-base text-neutral-9">Selisih</p>
              <h4
                className="text-neutral-9 text-md font-bold"
                aria-live="polite"
              >
                Rp {selisih.toLocaleString()}
              </h4>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/ArrowPemasukan.svg"
                alt="Ikon panah ke atas untuk pemasukan"
                aria-label="Ikon Pemasukan"
              />
              <div className="flex flex-col gap-1">
                <p className="text-base text-neutral-9">Uang Masuk</p>
                <h4
                  className="text-neutral-9 text-md font-bold"
                  aria-live="polite"
                >
                  Rp {monthlyIncome.toLocaleString()}
                </h4>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/ArrowPengeluaran.svg"
                alt="Ikon panah ke bawah untuk pengeluaran"
                aria-label="Ikon Pengeluaran"
              />
              <div className="flex flex-col gap-1">
                <p className="text-base text-neutral-9">Uang Keluar</p>
                <h4
                  className="text-neutral-9 text-md font-bold"
                  aria-live="polite"
                >
                  Rp {monthlyOutcome.toLocaleString()}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaporanKeuangan;
