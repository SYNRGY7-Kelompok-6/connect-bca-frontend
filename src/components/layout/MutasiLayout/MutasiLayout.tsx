import { useRef, useState } from "react";
import useBankStatement from "../../../contexts/useBankStatement";
import { useReactToPrint } from "react-to-print";
import { TablePrint } from "../tableprint/TablePrint";
import { Mutation } from "../../../types/BankStatementTypes";
import { getDateRange, parseISODate } from "../../../utils/utils";
import Table from "../table";
import SearchForm from "../searchformmutasi";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

function MutasiLayout() {
  const { bankStatement } = useBankStatement();
  const componentRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<DateRange>(getDateRange("1month"));
  const [selectedFilter, setSelectedFilter] = useState<string>('period');
  const mutation = bankStatement?.mutations
  const [filteredData, setFilteredData] = useState<Mutation[]>(mutation || []);

  const [datePicker, setDatePicker] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [datePickerState, setDatePickerState] = useState({
    startDatePicker: false,
    endDatePicker: false,
  })

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ?? null,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
  };
  
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const dateRange = getDateRange(value);
    setPeriod(dateRange);
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (selectedFilter === "datepicker") {
      if (id === "start-date") {
        setDatePicker((prevState) => ({
          ...prevState,
          startDate: new Date(value),
        }));
      }
      if (id === "end-date") {
        setDatePicker((prevState) => ({
          ...prevState,
          endDate: new Date(value),
        }));
      }
    }
  };

  async function handleSearch() {
    if (selectedFilter === "period") {
      const fromDate = period.startDate;
      const toDate = period.endDate;
      const filtered = bankStatement?.mutations.filter((item) => {
        const itemDate = parseISODate(item.transactionDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setFilteredData(filtered || []);
      // await fetchBankStatement(fromDate, toDate)
    } else if (selectedFilter === "datepicker") {
      const fromDate = datePicker.startDate;
      const toDate = datePicker.endDate;
      const filtered = bankStatement?.mutations.filter((item) => {
        const itemDate = parseISODate(item.transactionDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setFilteredData(filtered || [])
      // await fetchBankStatement(fromDate, toDate)
    } else {
      setFilteredData(bankStatement?.mutations || []);
    }
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
        <div id='table-section' className='w-full flex flex-col gap-[60px]'>
          <div className='flex flex-col rounded-[4px]'>
            <div className="bg-primary-dark-blue flex justify-between p-[18px] rounded-t-[4px]">
              <div className='flex flex-col justify-center gap-2'>
                <p aria-label="Mutasi Rekening" className='text-white text-2xl font-bold'>Mutasi Rekening</p>
              </div>
              <div className='flex gap-5 items-end'>
                <button aria-label="Unduh Mutasi" onClick={handlePrint} className='flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold'>
                  Unduh Mutasi
                </button>
              </div>
            </div>
            <SearchForm selectedFilter={selectedFilter} datePicker={datePicker} setDatePicker={setDatePicker} setDatePickerState={setDatePickerState} datePickerState={datePickerState} handleInputChange={handleInputChange} handleFilterChange={handleFilterChange} handlePeriodChange={handlePeriodChange} handleSearch={handleSearch} />
          </div>
              {
                filteredData?.length !== 0 ? (
                  <Table data={filteredData} />
                ) : (
                  <div className="flex justify-center bg-primary-light-blue rounded-[10px] p-4 text-primary-blue font-semibold text-md gap-[24px]">
                    <p role="alert" aria-label="Mutasi rekening yang Anda cari tidak ditemukan. Pastikan Anda telah memasukkan periode atau informasi yang benar." className="text-center text-secondary-red" >
                    "Mutasi rekening yang Anda cari tidak ditemukan. Pastikan Anda telah memasukkan periode atau informasi yang benar."
                    </p>
                  </div>
                )
              }
          <div className="hidden">
            <TablePrint aria-hidden="true" periodInfo={period} data={filteredData} ref={componentRef || undefined}/>
          </div>
        </div>
      </div>
  );
}

export default MutasiLayout;
