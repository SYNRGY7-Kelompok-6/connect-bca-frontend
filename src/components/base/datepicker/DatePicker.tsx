import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../styles/Calendar.css";
import FocusTrap from "focus-trap-react";

interface PopupProps {
  message?: string;
  svgSrc?: string;
  svgAlt?: string;
  labelPopup?: string;
  className?: string;
  dateType: "startDate" | "endDate";
  handleClose?: () => void;
  handleSubmit: (key: "startDate" | "endDate", value: Date) => void;
  isShow: boolean;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker: React.FC<PopupProps> = ({
  message,
  svgSrc,
  labelPopup,
  svgAlt,
  dateType,
  className,
  handleClose,
  handleSubmit,
  isShow,
}) => {
  const [value, setValue] = useState<Value>(new Date());

  if (!isShow) return null;

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        aria-label={labelPopup}
        aria-modal="true"
      >
        <div
          className={`bg-primary-light-blue items-center text-center flex flex-col justify-end text-primary-dark-blue max-w-max w-full m-auto rounded-xl ${className}`}
        >
          <h1 aria-label="">{message}</h1>
          {svgSrc && <img src={svgSrc} alt={svgAlt} width="78" height="80" />}
          <Calendar
            onChange={setValue}
            value={value}
            className="border-none !font-sans p-[18px]"
            showNavigation
            prev2Label={null}
            next2Label={null}
            nextAriaLabel="Bulan selanjutnya"
            prevAriaLabel="Bulan sebelumnya"
            maxDate={new Date()}
          />
          <div className="w-full flex gap-3 p-[18px] justify-center sm:justify-end">
            <button
              aria-label="tombol keluar popup"
              type="button"
              onClick={handleClose}
              className="flex gap-4 bg-primary-light-blue px-[36.5px] py-[10px] rounded-xl border border-primary-dark-blue text-primary-dark-blue font-semibold hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              aria-label="tombol submit popup"
              type="button"
              onClick={() => handleSubmit(dateType, value as Date)}
              className="flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold hover:bg-primary-dark-blue"
            >
              Pilih
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default DatePicker;
