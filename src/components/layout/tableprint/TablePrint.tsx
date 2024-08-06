import React from "react";
import useBankStatement from "../../../contexts/useBankStatement";


export const TablePrint = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { bankStatement, monthlyBankStatement } = useBankStatement()

  const formatCurrency = (amount: number | undefined) => {
    // Mengonversi angka menjadi string dan memformat dengan pemisah ribuan
    return amount?.toLocaleString('id-ID'); // Menggunakan lokal 'id-ID' untuk format Indonesia
  };

  return (
      <div ref={ref || undefined} className="flex flex-col gap-3" >
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
        <div>
          <div>
            <div>
              <span>Nama</span>
              <span>: Binar</span>
            </div>
            <div>
              <span>No rekening</span>
              <span>: 12739172017391</span>
            </div>
            <div>
              <span>Periode</span>
              <span>: 1 Juni 2024 - 30 Juni 2024</span>
            </div>
            <div>
              <span>Di cetak pada tanggal</span>
              <span>: 2 Juli 2024</span>
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
                      <span aria-label="Jumlah Mutasi Kredit">: Rp. {formatCurrency(monthlyBankStatement?.monthlyIncome?.value)}</span>
                      <span aria-label="Jumlah Mutasi Debit">: Rp. {formatCurrency(monthlyBankStatement?.monthlyOutcome?.value)}</span>
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
        {bankStatement?.mutations.length !== 0 ? (
          <table id="table" className="border border-primary-dark-blue border-collapse table-auto bg-primary-light-blue w-full rounded-t-[20px] rounded-b-[20px]">
            <thead className='bg-primary-blue text-primary-light-blue'>
              <tr className="h-11">
                <th className='first:rounded-ss-[10px] py-2 border border-primary-dark-blue border-collapse text-base font-semibold'>Tanggal</th>
                <th className="border border-primary-dark-blue border-collapse text-base font-semibold">Nama</th>
                <th className="border border-primary-dark-blue border-collapse text-base font-semibold">No Rekening</th>
                <th className="border border-primary-dark-blue border-collapse text-base font-semibold">Nominal</th>
                <th className="rounded-se-[10px] py-2 border border-primary-dark-blue border-collapse text-base font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className='text-primary-blue font-semibold text-base'>
              {bankStatement?.mutations?.map((data) => (
                <tr className='text-center h-11' key={data.transactionId}>
                  <td className='py-1 border border-primary-dark-blue border-collapse p-[10px]'>{data.transactionDate}</td>
                  <td className='border border-primary-dark-blue border-collapse p-[10px]'>{data.beneficiaryAccount.beneficiaryAccountName}</td>
                  <td className="border border-primary-dark-blue border-collapse p-[10px]">{data.beneficiaryAccount.beneficiaryAccountNumber}</td>
                  <td className="border border-primary-dark-blue border-collapse p-[10px]">Rp. {data.amount.value}</td>
                  <td className="border border-primary-dark-blue border-collapse text-left p-[10px]">{data.desc}</td>
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
  );
});