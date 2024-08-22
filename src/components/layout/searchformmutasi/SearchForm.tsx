import { useState } from 'react';
import Input from '../../base/input'
import useBankStatement from '../../../contexts/useBankStatement';
import DatePickerInput from '../datepickerinput';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DatePickerStateType {
  startDatePicker: boolean;
  endDatePicker: boolean;
}

interface SearchFormProps {
  selectedFilter: string,
  datePicker: DateRange,
  setDatePicker: React.Dispatch<React.SetStateAction<DateRange>>,
  setDatePickerState: React.Dispatch<React.SetStateAction<{
    startDatePicker: boolean;
    endDatePicker: boolean;
  }>>,
  datePickerState: DatePickerStateType,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handlePeriodChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  handleSearch: () => Promise<void>,
}

function SearchForm({
  selectedFilter,
  datePicker,
  setDatePicker,
  setDatePickerState,
  datePickerState,
  handleInputChange,
  handleFilterChange,
  handlePeriodChange,
  handleSearch
}: Readonly<SearchFormProps>) {
  const { bankStatement } = useBankStatement();
  const [accInfo] = useState({
    name: bankStatement?.accountInfo.name,
    accNo: bankStatement?.accountInfo.accountNo
  })

  const handleFocus = (key: 'startDatePicker' | 'endDatePicker') => {
    setDatePickerState((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  };

  const handleCloseCalendar = (key: 'startDatePicker' | 'endDatePicker') => {
    setDatePickerState((prevState) => ({
      ...prevState,
      [key]: false,
    }));
  };

  const handleSubmitCalendar = (key: 'startDate' | 'endDate', value: Date) => {
    let adjustedValue: Date;

    if (key === 'startDate') {
      adjustedValue = new Date(value);
      adjustedValue.setHours(0, 0, 0, 0);
    } else if (key === 'endDate') {
      adjustedValue = new Date(value);
      adjustedValue.setHours(23, 59, 59, 999);
    }

    setDatePicker((prevState) => ({
      ...prevState,
      [key]: adjustedValue,
    }));
    setDatePickerState((prevState) => ({
      ...prevState,
      [`${key}Picker`]: false,
    }));
  };

  return (
    <div className="bg-neutral-1 p-9 flex flex-col gap-[18px] shadow-box rounded-b-[4px]">
      <p aria-label="Kriteria Pencarian" className="text-primary-dark-blue font-semibold text-[20px]">Kriteria Pencarian</p>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[18px]">
          <div className="flex md:flex-row flex-col items-center font-semibold text-base text-primary-dark-blue content-center w-full lg:gap-16 gap-3">
            <label htmlFor="rekening" className="lg:w-[305px] md:w-[480px] w-full">
              Rekening
            </label>
            <div className='w-full'>
              <Input ariaLabel="input-rekening" id="rekening" value={`${accInfo.name} - ${accInfo.accNo}`} type="text" disabled />
            </div>
          </div>
          <div className="flex items-center gap-2 font-semibold text-base text-primary-dark-blue content-center">
            <div className="flex md:flex-row flex-col items-center w-full gap-3 lg:gap-16">
              <div className='w-full md:w-[480px] lg:w-[305px] flex justify-start gap-2 content-center'>
                <input type="radio" checked={selectedFilter === 'period'} onChange={handleFilterChange} name="filter-group" id="period" value='period' className="h-5 w-5 border-primary-dark-blue" />
                <label htmlFor="periodselect" className="w-full">
                  Periode
                </label>
              </div>
              <div className="relative flex flex-row items-center justify-end w-full">
                <img
                  src="/Down1.svg"
                  alt="arrow-icon"
                  className="absolute pointer-events-none mr-3"
                />
                <select
                  name="input-component"
                  id="periodselect"
                  aria-describedby="pilih periode"
                  onChange={handlePeriodChange}
                  className="bg-white p-[10px] gap-[10px] border border-primary-dark-blue rounded-[10px] flex text-primary-dark-blue font-semibold text-base w-full"
                >
                  <option value="1month">1 Bulan yang lalu</option>
                  <option value="3week">3 Minggu yang lalu</option>
                  <option value="2week">2 Minggu yang lalu</option>
                  <option value="1week">1 Minggu yang lalu</option>
                </select>
              </div>
            </div>
          </div>

          <DatePickerInput
            handleFocus={handleFocus}
            handleInputChange={handleInputChange}
            datePicker={datePicker}
            datePickerState={datePickerState}
            handleCloseCalendar={handleCloseCalendar}
            handleSubmitCalendar={handleSubmitCalendar}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col gap-[18px] w-full">
          <div className="flex flex-col gap-[18px] items-end">
            <span aria-description="Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari dan harus masuk dalam periode 6 bulan transaksi terakhir." className="font-medium text-sm text-primary-dark-blue">Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari dan harus masuk dalam periode 6 bulan transaksi terakhir.</span>
            <button onClick={handleSearch} className='w-[179px] justify-center flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold'>
              Cari
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
