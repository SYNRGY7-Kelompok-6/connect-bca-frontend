import { useRef, useState } from "react";
import useBankStatement from "../../../contexts/useBankStatement";
import Input from "../../base/input";
import { useReactToPrint } from "react-to-print";
import { TablePrint } from "../tableprint/TablePrint";
import DatePicker from "../../base/datepicker";
import { Mutation } from "../../../types/BankStatementTypes";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

function MutasiLayout() {
  const { bankStatement, monthlyBankStatement } = useBankStatement()
  const componentRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<DateRange>(getDateRange('1month'));

  const [datePicker, setDatePicker] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [accInfo] = useState({
    name: bankStatement?.accountInfo.name,
    accNo: bankStatement?.accountInfo.accountNo
  })
  const [noAccount, setNoAccount] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('period');
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showDatePicker1, setShowDatePicker1] = useState(false)
  const mutation = bankStatement?.mutations
  const [filteredData, setFilteredData] = useState<Mutation[]>(mutation || []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ?? null,
  });

  const handleNoAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoAccount(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const dateRange = getDateRange(value)
    setPeriod(dateRange)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (selectedFilter === 'datepicker') {
      if (id === 'start-date') {
        setDatePicker(prevState => ({
          ...prevState,
          startDate: new Date(value)
        }))
        // setStartDate(new Date(value))
      }
      if (id === 'end-date') {
        setDatePicker(prevState => ({
          ...prevState,
          endDate: new Date(value)
        }))
        // setEndDate(new Date(value))
      }
    }
  };

  const handleFocus = () => {
    setShowDatePicker(true)
  }

  const handleCloseCalendar = () => {
    setShowDatePicker(false)
  }

  const handleSubmitCalendar = (value: Date) =>{
    setDatePicker(prevState => ({
      ...prevState,
      startDate: value
    }))
    setShowDatePicker(false)
  }

  const handleFocus1 = () => {
    setShowDatePicker1(true)
  }

  const handleCloseCalendar1 = () => {
    setShowDatePicker1(false)
  }

  const handleSubmitCalendar1 = (value: Date ) =>{
    setDatePicker(prevState => ({
      ...prevState,
      endDate: value
    }))
    setShowDatePicker1(false)
  }

  function getDateRange(period: string): DateRange {
    const endDate = new Date(); // Current date
    const startDate = new Date(); // Default to the current date

    if (period === '1month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === '1week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '2week') {
      startDate.setDate(startDate.getDate() - 14);
    } else if (period === '3week') {
      startDate.setDate(startDate.getDate() - 21);
    } else {
      throw new Error('Invalid period');
    }

    // Normalize dates to the start of the day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
  }

  function formatDateToString (date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const formatDateTable = (timestamp: string): string => {
    const date = new Date(timestamp);
    // Format tanggal sesuai dengan lokal dan tanpa jam
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // const formatDateFetch = (date: Date) => {
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // Months are zero-based
  //   const year = date.getFullYear();

  //   // Format day and month to ensure two digits
  //   const formattedDay = day < 10 ? `0${day}` : day;
  //   const formattedMonth = month < 10 ? `0${month}` : month;

  //   return `${formattedDay}-${formattedMonth}-${year}`;
  // };

  // Convert ISO date string to Date object
  const parseISODate = (isoDateString: string) => {
    const newDate = new Date(isoDateString)
    newDate.setHours(0, 0, 0, 0)
    return newDate;
  };

  const formatCurrency = (amount: number | undefined) => {
    // Mengonversi angka menjadi string dan memformat dengan pemisah ribuan
    return amount?.toLocaleString('id-ID'); // Menggunakan lokal 'id-ID' untuk format Indonesia
  };

  async function handleSearch() {
    if (selectedFilter === 'period') {
      const fromDate = period.startDate
      const toDate = period.endDate
      const filtered = bankStatement?.mutations.filter(item => {
        const itemDate = parseISODate(item.transactionDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setFilteredData(filtered || [])
      console.log(selectedFilter)
      console.log(filteredData)
      // await fetchBankStatement(fromDate, toDate)
    } else if (selectedFilter === 'datepicker') {
      const fromDate = datePicker.startDate
      const toDate = datePicker.endDate
      const filtered = bankStatement?.mutations.filter(item => {
        const itemDate = parseISODate(item.transactionDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setFilteredData(filtered || [])
      console.log(selectedFilter)
      console.log(filteredData)
      // await fetchBankStatement(fromDate, toDate)
    } else if (noAccount) {
      const filtered = bankStatement?.mutations.filter(item => {
        return item.beneficiaryAccount.beneficiaryAccountNumber === noAccount;
      });
      setFilteredData(filtered || [])
      console.log('no',filtered)
    } else {
      setFilteredData(bankStatement?.mutations || [])
      console.log(selectedFilter)
      console.log(bankStatement)
    }
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
        <div id='table-section' className='w-full flex flex-col gap-[50px]'>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-center gap-2'>
              <p aria-label="Mutasi Rekening" className='text-white text-2xl font-bold'>Mutasi Rekening</p>
            </div>
            <div className='flex gap-5 items-end'>
              <button aria-label="Unduh Mutasi" onClick={handlePrint} className='flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold'>
                Unduh Mutasi
              </button>
            </div>
          </div>
          <div className="bg-primary-light-blue p-9 flex flex-col gap-[18px] rounded-[10px]">
            <p aria-label="Kriteria Pencarian" className="text-primary-dark-blue font-semibold text-[20px]">Kriteria Pencarian</p>
            <div className="flex flex-row gap-[60px]">
              <div className="flex flex-col gap-[18px]">
                <div className="font-semibold text-base text-primary-dark-blue h-[46px] content-center">
                  <label htmlFor="rekening" className="whitespace-nowrap">Rekening</label>
                </div>
                <div className="flex items-center gap-2 font-semibold text-base text-primary-dark-blue h-[46px] content-center">
                  <input type="radio" checked={selectedFilter === 'period'} onChange={handleFilterChange} name="filter-group" id="period" value='period' className="h-5 w-5 border-primary-dark-blue" />
                  <label htmlFor="periodselect" className="whitespace-nowrap">Periode</label>
                </div>
                <div className="flex items-center gap-2 font-semibold text-base text-primary-dark-blue h-[46px] content-center">
                  <input type="radio" checked={selectedFilter === 'datepicker'}  onChange={handleFilterChange} name="filter-group" id="datepicker" value='datepicker' className="h-5 w-5" />
                  <label htmlFor="tanggal-awal" className="whitespace-nowrap">Tanggal Awal (dd/mm/yy)</label>
                </div>
                <div className="flex items-center justify-end gap-2 font-semibold text-base text-primary-dark-blue h-[46px] content-center">
                  <label htmlFor="tanggal-akhir" className="whitespace-nowrap">Tanggal Akhir (dd/mm/yy)</label>
                </div>
              </div>
              <div className="flex flex-col gap-[18px] w-full">
                <Input ariaLabel="input-rekening" id="rekening" value={`${accInfo.name} - ${accInfo.accNo}`} type="text" onChange={handleNoAccountChange} />
                <div className="relative flex flex-row items-center justify-end">
                  <img src='/Down1.svg' alt="arrow-icon" className='absolute pointer-events-none mr-3' />
                  <select name="input-component" id="periodselect" onChange={handlePeriodChange} className="bg-white p-[10px] gap-[10px] border border-primary-dark-blue rounded-[10px] flex text-primary-blue font-semibold text-base w-full" >
                    <option value="1month">1 Bulan</option>
                    <option value="3week">3 Minggu</option>
                    <option value="2week">2 Minggu</option>
                    <option value="1week">1 Minggu</option>
                  </select>
                </div>
                <Input aria-haspopup='true' placeholder="dd/mm/yyyy" onFocus={handleFocus} value={formatDateToString(datePicker.startDate)} onChange={handleInputChange} id="tanggal-awal" iconSrc="/Calendar2.svg" iconAlt="icon kalender" />
                <Input aria-haspopup='true' placeholder="dd/mm/yyyy" onFocus={handleFocus1} value={formatDateToString(datePicker.endDate)} onChange={handleInputChange} id="tanggal-akhir" iconSrc="/Calendar2.svg" iconAlt="icon kalender" />
                <div className="flex flex-col gap-[18px] items-end">
                  <span aria-description="Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari dan harus masuk dalam periode 6 bulan transaksi terakhir." className="font-medium text-sm text-primary-dark-blue">Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari dan harus masuk dalam periode 6 bulan transaksi terakhir.</span>
                  <button onClick={handleSearch} className='w-[179px] justify-center flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold'>
                    Cari
                  </button>
                </div>
              </div>
            </div>
            {
              showDatePicker && (
                <DatePicker labelPopup="Popup Pilih tanggal kalender" handleClose={handleCloseCalendar} handleSubmit={handleSubmitCalendar} />
              )
            }
            {
              showDatePicker1 && (
                <DatePicker labelPopup="Popup Pilih tanggal kalender" handleClose={handleCloseCalendar1} handleSubmit={handleSubmitCalendar1} />
              )
            }
          </div>
              {
                filteredData?.length !== 0 ? (
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
                        filteredData?.map((data) => (
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
                ) : (
                  <div className="flex justify-center bg-primary-light-blue rounded-[10px] p-4 text-primary-blue font-semibold text-md gap-[24px]">
                    <p aria-label="Tidak ada transaksi yang ditemukan">
                      Tidak ada transaksi yang ditemukan
                    </p>
                  </div>
                )
              }
          <div className="hidden">
            <TablePrint aria-hidden="true" ref={componentRef || undefined}/>
          </div>
        </div>
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
      </div>
  )
}

export default MutasiLayout
