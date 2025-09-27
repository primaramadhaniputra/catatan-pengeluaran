export function formatDate(date: Date, separator?: string): string {
  const separatorText = separator || "/";
  // ambil hari, bulan, tahun
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
  const year = date.getFullYear();

  return `${day}${separatorText}${month}${separatorText}${year}`;
}

export function formatDateYearMonthDate(dateString: Date) {
  // const date = new Date(dateString);
  const year = dateString.getFullYear();
  const month = String(dateString.getMonth() + 1).padStart(2, "0");
  const day = String(dateString.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function convertUnixToTime(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // *1000 karena JS pakai milidetik
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatUnixToDate(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // kali 1000 karena timestamp dalam detik

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum’at",
    "Sabtu",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
}

export function getBetweenDays(startDate: number, endDate: number) {
  // konversi ke milidetik
  const start = startDate * 1000;
  const end = endDate * 1000;

  // selisih waktu
  const diffMs = end - start;

  // hitung hari (dibulatkan ke atas supaya full day dihitung)
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return days;
}

// Format angka ke currency (ID format)
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

// Convert currency string ke number
export const parseCurrency = (value: string) => {
  // hapus semua karakter non-digit
  const numberString = value.replace(/\./g, "").replace(/[^0-9]/g, "");
  return Number(numberString);
};

export function parseDate(str: string) {
  if (!str) return null; // handle kalau string kosong

  const [day, month, year] = str.split("-").map(Number);

  // Validasi sederhana
  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
}
