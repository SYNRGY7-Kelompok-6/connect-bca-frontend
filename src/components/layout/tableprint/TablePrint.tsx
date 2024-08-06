import React from "react";
import useBankStatement from "../../../contexts/useBankStatement";


export const TablePrint = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { bankStatement } = useBankStatement()

  return (
    <div ref={ref || undefined} >
      {
        bankStatement?.mutations.length !== 0 ? (
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
              {
                bankStatement?.mutations?.map((data) => (
                  <tr className='text-center h-11' key={data.transactionId}>
                    <td className='py-1 border border-primary-dark-blue border-collapse p-[10px]'>{data.transactionDate}</td>
                    <td className='border border-primary-dark-blue border-collapse p-[10px]'>{data.beneficiaryAccount.beneficiaryAccountName}</td>
                    <td className="border border-primary-dark-blue border-collapse p-[10px]">{data.beneficiaryAccount.beneficiaryAccountNumber}</td>
                    <td className="border border-primary-dark-blue border-collapse p-[10px]">Rp. {data.amount.value}</td>
                    <td className="border border-primary-dark-blue border-collapse text-left p-[10px]">{data.desc}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center bg-primary-light-blue rounded-[10px] p-4 text-primary-blue font-semibold text-md gap-[24px]">
            <p>
              Tidak ada transaksi yang ditemukan
            </p>
          </div>
        )
      }
    </div>
  );
});