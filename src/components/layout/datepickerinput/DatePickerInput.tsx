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
  handleCloseCalendar: (key: "startDatePicker" | "endDatePicker") => void,
  handleSubmitCalendar: (key: "startDate" | "endDate", value: Date) => void,
}

function DatePickerInput({
  handleFocus,
  handleInputChange,
  datePicker,
  datePickerState,
  handleCloseCalendar,
  handleSubmitCalendar,
}: Readonly<DatePickerInputProps>) {
  return (
    <>
      <Input aria-haspopup='true' placeholder="dd/mm/yyyy" onClick={() => handleFocus('startDatePicker')} onKeyDown={() => handleFocus('startDatePicker')} value={formatDateToString(datePicker.startDate)} onChange={handleInputChange} id="tanggal-awal" iconSrc="/Calendar2.svg" iconAlt="icon kalender" />

      <Input aria-haspopup='true' placeholder="dd/mm/yyyy" onClick={() => handleFocus('endDatePicker')} onKeyDown={() => handleFocus('endDatePicker')} value={formatDateToString(datePicker.endDate)} onChange={handleInputChange} id="tanggal-akhir" iconSrc="/Calendar2.svg" iconAlt="icon kalender" />

      <DatePicker labelPopup="Popup Pilih tanggal kalender" isShow={datePickerState.startDatePicker} handleClose={() => handleCloseCalendar('startDatePicker')} dateType='startDate' handleSubmit={handleSubmitCalendar} />

      <DatePicker labelPopup="Popup Pilih tanggal kalender" isShow={datePickerState.endDatePicker} handleClose={() => handleCloseCalendar('endDatePicker')} dateType='endDate' handleSubmit={handleSubmitCalendar} />
    </>
  )
}

export default DatePickerInput
