import { ChangeEvent } from 'react'
import { formatDateToString } from '../../../utils/utils'
import DatePicker from '../../base/datepicker'
import Input from '../../base/input'

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DatePickerStateType {
  startDatePicker: boolean;
  endDatePicker: boolean;
}

interface DatePickerInputProps {
  handleFocus: (key: "startDatePicker" | "endDatePicker") => void,
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  datePicker: DateRange,
  datePickerState: DatePickerStateType,
  selectedFilter: string,
  handleCloseCalendar: (key: "startDatePicker" | "endDatePicker") => void,
  handleSubmitCalendar: (key: "startDate" | "endDate", value: Date) => void,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

function DatePickerInput({
  handleFocus,
  handleInputChange,
  datePicker,
  datePickerState,
  selectedFilter,
  handleCloseCalendar,
  handleSubmitCalendar,
  handleFilterChange,
}: Readonly<DatePickerInputProps>) {
  return (
    <>
      <div className="flex items-center gap-2 font-semibold text-base text-primary-dark-blue content-center">
        <div className="flex md:flex-row flex-col md:items-center w-full gap-3 lg:gap-16">
          <div className='w-full md:w-[480px] lg:w-[536px] xl:w-[305px] flex justify-start gap-2 content-center'>
            <input type="radio" checked={selectedFilter === 'datepicker'}  onChange={handleFilterChange} name="filter-group" id="datepicker" value='datepicker' className="h-5 w-5" />
            <label htmlFor="tanggal-awal" className="whitespace-nowrap w-[215px] md:w-full">
              Tanggal Awal (dd/mm/yy)
            </label>
          </div>
          <div className="w-full">
            <Input
              aria-haspopup='true'
              placeholder="dd/mm/yyyy"
              onClick={() => handleFocus('startDatePicker')}
              onKeyDown={() => handleFocus('startDatePicker')}
              value={formatDateToString(datePicker.startDate)}
              onChange={handleInputChange}
              id="tanggal-awal"
              iconSrc="/Calendar2.svg"
              iconAlt="icon kalender"
            />
            <DatePicker labelPopup="Popup Pilih tanggal kalender" isShow={datePickerState.startDatePicker} handleClose={() => handleCloseCalendar('startDatePicker')} dateType='startDate' handleSubmit={handleSubmitCalendar} className='' />
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:items-center font-semibold text-base text-primary-dark-blue content-center ml-0 md:ml-0 gap-3 lg:gap-16">
        <div className='w-full md:w-[480px] lg:w-[536px] xl:w-[305px] flex justify-start gap-2 content-center'>
          <label htmlFor="tanggal-akhir" className="whitespace-nowrap md:ml-7 w-[215px] md:w-full">
            Tanggal Akhir (dd/mm/yy)
          </label>
        </div>
        <div className="w-full">
          <Input aria-haspopup='true'
            placeholder="dd/mm/yyyy" onClick={() => handleFocus('endDatePicker')}
            onKeyDown={() => handleFocus('endDatePicker')}
            value={formatDateToString(datePicker.endDate)}
            onChange={handleInputChange}
            id="tanggal-akhir"
            iconSrc="/Calendar2.svg"
            iconAlt="icon kalender"
          />
          <DatePicker labelPopup="Popup Pilih tanggal kalender" isShow={datePickerState.endDatePicker} handleClose={() => handleCloseCalendar('endDatePicker')} dateType='endDate' handleSubmit={handleSubmitCalendar} />
        </div>
      </div>
    </>
  )
}

export default DatePickerInput
