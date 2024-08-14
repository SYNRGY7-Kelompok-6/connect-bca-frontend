
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

export {
  formatCurrency,
  formatDateFetch,
  formatDateTable,
  formatDateToString,
  parseISODate
}