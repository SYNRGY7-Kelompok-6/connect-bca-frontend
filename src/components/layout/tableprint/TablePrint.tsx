import React, { useState } from "react";
import useBankStatement from "../../../contexts/useBankStatement";
import { formatCurrency, formatDateTable } from "../../../utils/utils";
import { Mutation } from "../../../types/BankStatementTypes";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface TablePrintProps {
  data: Mutation[],
  periodInfo: DateRange
}

export const TablePrint = React.forwardRef<HTMLDivElement, TablePrintProps>(({ data, periodInfo }, ref) => {
  const { bankStatement, monthlyBankStatement } = useBankStatement()

  const [accInfo] = useState({
    name: bankStatement?.accountInfo.name,
    accNo: bankStatement?.accountInfo.accountNo
  })

  return (
      <div ref={ref || undefined} className="flex flex-col gap-3 min-h-screen" >
        <header className="bg-primary-blue w-full p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/LogoBCA.png" alt="Logo Connect by BCA" />
              <div className="flex flex-col gap-1.5">
                <h1
                  className="font-semibold text-white text-lg"
                  aria-label="Connect by BCA"
                >
                  Connect
                </h1>
                <p className="text-white text-sm" aria-hidden="true">
                  by BCA
                </p>
              </div>
            </div>
            <h2
              className="font-semibold text-lg text-white"
              aria-label="Internet Banking"
            >
              Internet Banking
            </h2>
          </div>
        </header>
        <div className="p-3 flex flex-col gap-4">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between text-primary-blue">
              <div id="left-container" className="flex flex-row gap-6">
                <div className="flex flex-col justify-start gap-2">
                  <span>Nama</span>
                  <span>No rekening</span>
                </div>
                <div className="flex flex-col justify-start gap-2">
                  <span>: {accInfo.name}</span>
                  <span>: {accInfo.accNo}</span>
                </div>
              </div>
              <div id="right-container" className="flex flex-row gap-6">
                <div className="flex flex-col justify-start gap-2">
                  <span>Periode</span>
                  <span>Di cetak pada tanggal</span>
                </div>
                <div className="flex flex-col justify-start gap-2">
                  <span>: {formatDateTable(periodInfo.startDate.toString())} - {formatDateTable(periodInfo.endDate.toString())}</span>
                  <span>: {formatDateTable(new Date().toString())}</span>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-row bg-primary-light-blue rounded-[10px] p-4 text-primary-blue text-base w-[286px] gap-[24px]'>
                {
                  monthlyBankStatement ? (
                    <>
                      <div className="flex flex-col w-full font-semibold">
                        <span aria-label="Saldo Awal" >Saldo Awal</span>
                        <span aria-label="Mutasi Kredit">Mutasi Kredit</span>
                        <span aria-label="Mutasi Debit">Mutasi Debit</span>
                        <span aria-label="Saldo Akhir">Saldo Akhir</span>
                      </div>
                      <div className="flex flex-col w-full font-normal">
                        <span aria-label="Jumlah Saldo Awal">: Rp. {formatCurrency(bankStatement?.accountBalance?.startingBalance?.value) ?? 'N/A'}</span>
                        <span aria-label="Jumlah Mutasi Kredit" className="text-secondary-green">: Rp. {formatCurrency(monthlyBankStatement?.monthlyIncome?.value)}</span>
                        <span aria-label="Jumlah Mutasi Debit" className="text-secondary-red">: Rp. {formatCurrency(monthlyBankStatement?.monthlyOutcome?.value)}</span>
                        <span aria-label="Jumlah Saldo Akhir">: Rp. {formatCurrency(bankStatement?.accountBalance?.endingBalance?.value) ?? 'N/A'}</span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p aria-label="Data tidak tersedia saat ini">
                        Data tidak tersedia saat ini
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div>
          {data?.length !== 0 ? (
            <table id="table" className="border border-collapse table-auto bg-primary-light-blue w-full rounded-t-[20px] rounded-b-[20px]">
              <thead className='bg-primary-blue text-primary-light-blue'>
                <tr className="h-11">
                  <th className='first:rounded-ss-[10px] py-2 border border-white border-collapse text-base font-semibold'>Tanggal</th>
                  <th className="border border-white border-collapse text-base font-semibold">Nama</th>
                  <th className="border border-white border-collapse text-base font-semibold">No Rekening</th>
                  <th className="border border-white border-collapse text-base font-semibold">Nominal</th>
                  <th className="rounded-se-[10px] py-2 border border-white border-collapse text-base font-semibold">Keterangan</th>
                </tr>
              </thead>
              <tbody className='text-primary-blue font-semibold text-base'>
                {bankStatement?.mutations?.map((data) => (
                  <tr className='text-center h-11' key={data.transactionId}>
                    <td className='py-1 border border-white border-collapse p-[10px]'>{formatDateTable(data.transactionDate)}</td>
                    <td className='border border-white border-collapse p-[10px]'>{data.beneficiaryAccount.beneficiaryAccountName}</td>
                    <td className="border border-white border-collapse p-[10px]">{data.beneficiaryAccount.beneficiaryAccountNumber}</td>
                    {
                      data.type === 'CREDIT' ? (
                        <td className="border border-white border-collapse p-[10px] text-secondary-green">+Rp. {formatCurrency(data.amount.value)}</td>
                      ) : (
                        <td className="border border-white border-collapse p-[10px] text-secondary-red">-Rp. {formatCurrency(data.amount.value)}</td>
                      )
                    }
                    <td className="border border-white border-collapse text-left p-[10px]">{data.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center bg-primary-light-blue rounded-[10px] p-4 text-primary-blue font-semibold text-md gap-[24px]">
              <p>
                Tidak ada transaksi yang ditemukan
              </p>
            </div>
          )}
          </div>
        </div>
        <footer className="bg-primary-blue w-full p-4 mt-8 absolute bottom-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/LogoBCA.png" alt="Logo Connect by BCA" />
              <div className="flex flex-col gap-1.5">
                <h1
                  className="font-semibold text-white text-lg"
                  aria-label="Connect by BCA"
                >
                  Connect
                </h1>
                <p className="text-white text-sm" aria-hidden="true">
                  by BCA
                </p>
              </div>
            </div>
            <h2
              className="font-semibold text-lg text-white"
              aria-label="Internet Banking"
            >
              Internet Banking
            </h2>
          </div>
        </footer>
      </div>
  );
});