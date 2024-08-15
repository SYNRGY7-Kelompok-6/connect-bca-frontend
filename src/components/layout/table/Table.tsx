import { Mutation } from '../../../types/BankStatementTypes'
import { formatCurrency, formatDateTable } from '../../../utils/utils'

interface TableProps {
  data: Mutation[]
}

function Table({ data }: Readonly<TableProps>) {
  return (
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
          data?.map((data) => (
            <tr className='text-center h-11' key={data.transactionId}>
              <td className='py-1 border border-primary-dark-blue border-collapse p-[10px]'>{formatDateTable(data.transactionDate)}</td>
              <td className='border border-primary-dark-blue border-collapse p-[10px]'>{data.beneficiaryAccount.beneficiaryAccountName}</td>
              <td className="border border-primary-dark-blue border-collapse p-[10px]">{data.beneficiaryAccount.beneficiaryAccountNumber}</td>
              <td className="border border-primary-dark-blue border-collapse p-[10px]">Rp. {formatCurrency(data.amount.value)}</td>
              <td className="border border-primary-dark-blue border-collapse text-left p-[10px]">{data.desc}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table
