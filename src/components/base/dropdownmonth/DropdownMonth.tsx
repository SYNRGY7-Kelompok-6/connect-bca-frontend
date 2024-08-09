import React, { useState, useEffect } from "react";

const getLastFourMonths = (): { month: string; monthNumber: number }[] => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const result = [];
  for (let i = 0; i < 4; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = monthIndex > currentMonth ? currentYear - 1 : currentYear;
    result.push({
      month: `${months[monthIndex]} ${year}`,
      monthNumber: monthIndex + 1,
    });
  }
  return result;
};

interface DropdownMonthProps {
  onSelectMonth: (month: number) => void;
}

const DropdownMonth: React.FC<DropdownMonthProps> = ({ onSelectMonth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [months, setMonths] = useState<
    { month: string; monthNumber: number }[]
  >([]);

  useEffect(() => {
    const lastFourMonths = getLastFourMonths();
    setMonths(lastFourMonths);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectMonth = (monthNumber: number) => {
    setSelectedMonth(monthNumber);
    setIsOpen(false);
    onSelectMonth(monthNumber);
  };

  return (
    <div className="relative w-full">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-primary-dark-blue border-2 border-primary-dark-blue bg-primary-light-blue font-semibold rounded-2xl text-base px-5 py-3 text-center inline-flex items-center w-full justify-between"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        aria-label="Pilih bulan"
      >
        {months.find((m) => m.monthNumber === selectedMonth)?.month ||
          "Pilih Bulan"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown-menu"
        className={`absolute top-full mt-2 ${
          isOpen ? "block z-50" : "hidden"
        } bg-primary-light-blue divide-y divide-gray-100 rounded-lg shadow w-full transition ease-out duration-100`}
        role="menu"
        aria-label="Daftar bulan"
      >
        <ul
          className="py-2 text-sm text-primary-dark-blue"
          aria-labelledby="dropdownDefaultButton"
        >
          {months.map((month) => (
            <li key={month.monthNumber}>
              <button
                onClick={() => handleSelectMonth(month.monthNumber)}
                className="block px-4 py-2 hover:bg-primary-blue hover:text-primary-light-blue text-base font-semibold w-full text-left"
                role="menuitem"
                aria-label={`Pilih bulan ${month.month}`}
              >
                {month.month}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMonth;
