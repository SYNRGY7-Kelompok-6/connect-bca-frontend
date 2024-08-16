interface DateRange {
  startDate: Date;
  endDate: Date;
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

const formatDateFetch = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Format day and month to ensure two digits
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
};

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

function getDateRange(period: string): DateRange {
  const endDate = new Date(); // Current date
  const startDate = new Date(); // Default to the current date

  if (period === "1month") {
    startDate.setMonth(startDate.getMonth() - 1);
  } else if (period === "1week") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === "2week") {
    startDate.setDate(startDate.getDate() - 14);
  } else if (period === "3week") {
    startDate.setDate(startDate.getDate() - 21);
  } else {
    throw new Error("Invalid period");
  }

  // Normalize dates to the start of the day
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

export {
  formatCurrency,
  formatDateFetch,
  formatDateTable,
  formatDateToString,
  parseISODate,
  getDateRange
}