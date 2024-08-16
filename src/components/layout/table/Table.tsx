import { Mutation } from '../../../types/BankStatementTypes'
import { formatCurrency, formatDateTable } from '../../../utils/utils'

interface TableProps {
  data: Mutation[]
}

function Table({ data }: Readonly<TableProps>) {
  return (
    <table id="table" className="table-auto overflow-hidden shadow-box border-spacing-[1px] bg-primary-dark-blue border-primary-dark-blue border-separate w-full rounded-t-[4px] rounded-b-[4px]">
      <thead className='bg-primary-dark-blue text-neutral-1 rounded-ss-[4px]'>
        <tr className="h-11 rounded-ss-[4px]">
          <th className='first:rounded-ss-[4px] py-2 text-base font-semibold'>Tanggal</th>
          <th className="text-base font-semibold">Nama</th>
          <th className="text-base font-semibold">No Rekening</th>
          <th className="text-base font-semibold">Nominal</th>
          <th className="rounded-se-[4px] py-2 text-base font-semibold">Keterangan</th>
        </tr>
      </thead>
      <tbody className='text-primary-dark-blue font-semibold text-base'>
        {
          data?.map((data) => (
            <tr className='text-center h-11' key={data.transactionId}>
              <td className='bg-neutral-1 py-1 p-[10px]'>{formatDateTable(data.transactionDate)}</td>
              <td className='bg-neutral-1 p-[10px]'>{data.beneficiaryAccount.beneficiaryAccountName}</td>
              <td className="bg-neutral-1 p-[10px]">{data.beneficiaryAccount.beneficiaryAccountNumber}</td>
              <td className="bg-neutral-1 p-[10px]">Rp. {formatCurrency(data.amount.value)}</td>
              <td className="bg-neutral-1 text-left p-[10px]">{data.desc}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table