import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface PopupProps {
  message?: string;
  svgSrc?: string;
  svgAlt?: string;
  labelPopup?: string;
  className?: string;
  handleClose?: () => void;
  handleSubmit: (value: Date) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker: React.FC<PopupProps> = ({
  message,
  svgSrc,
  labelPopup,
  svgAlt,
  className,
  handleClose,
  handleSubmit,
  // value:
}) => {
  const [value, setValue] = useState<Value | any>(new Date())

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-label={labelPopup}
      aria-modal="true"
    >
      <div className={`bg-primary-light-blue items-center text-center flex flex-col justify-end text-primary-dark-blue w-max ${className}`}>
        <h1 aria-label="">
          {message}
        </h1>
        {
          svgSrc && <img src={svgSrc} alt={svgAlt} width="78" height="80" />
        }
        <Calendar onChange={setValue} value={value} className='border-none !font-sans' />
        <div className="w-full flex gap-1 p-[18px] justify-end">
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
            onClick={() => handleSubmit(value)}
            className="flex gap-4 bg-primary-blue px-[36.5px] py-[10px] rounded-xl text-white font-semibold hover:bg-primary-dark-blue"
            >
              Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
