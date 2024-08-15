import { BankStatementData, MonthlyBankStatementData } from "../../../types/BankStatementTypes"
import { formatCurrency } from "../../../utils/utils"

interface BalanceSummaryProps {
  bankStatement: BankStatementData | null,
  monthlyBankStatement: MonthlyBankStatementData | null,
}

function BalanceSummary({ bankStatement, monthlyBankStatement }: Readonly<BalanceSummaryProps>) {
  return (
    <div className='flex justify-between'>
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
  )
}

export default BalanceSummary
