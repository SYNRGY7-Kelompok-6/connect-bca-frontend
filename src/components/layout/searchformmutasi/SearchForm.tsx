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
    setDatePicker((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    setDatePickerState((prevState) => ({
      ...prevState,
      [`${key}Picker`]: false,
    }));
  };

  return (
    <div className="bg-neutral-1 p-9 flex flex-col gap-[18px] shadow-box rounded-b-[4px]">
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
          <Input ariaLabel="input-rekening" id="rekening" value={`${accInfo.name} - ${accInfo.accNo}`} type="text" disabled />
          <div className="relative flex flex-row items-center justify-end">
            <img src='/Down1.svg' alt="arrow-icon" className='absolute pointer-events-none mr-3' />
            <select name="input-component" id="periodselect" aria-describedby="pilih periode" onChange={handlePeriodChange} className="bg-white p-[10px] gap-[10px] border border-primary-dark-blue rounded-[10px] flex text-primary-dark-blue font-semibold text-base w-full" >
              <option value="1month">1 Bulan</option>
              <option value="3week">3 Minggu</option>
              <option value="2week">2 Minggu</option>
              <option value="1week">1 Minggu</option>
            </select>
          </div>
          <DatePickerInput
            handleFocus={handleFocus}
            handleInputChange={handleInputChange}
            datePicker={datePicker}
            datePickerState={datePickerState}
            handleCloseCalendar={handleCloseCalendar}
            handleSubmitCalendar={handleSubmitCalendar}
          />
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
