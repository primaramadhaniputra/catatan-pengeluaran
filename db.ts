import * as SQLite from "expo-sqlite";

// Buka / buat database (sinkron)
export const db = SQLite.openDatabaseSync("catatan-pengeluaran.db");

// Buat tabel transactions
export const initDB = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoryId TEXT NOT NULL,
      categoryName TEXT NOT NULL,
      date TEXT NOT NULL,
      nominal TEXT NOT NULL,
      note TEXT
    );
  `);
};

// Insert data
export const insertTransaction = async (
  categoryId: string,
  categoryName: string,
  date: string,
  nominal: string,
  note?: string
) => {
  await db.runAsync(
    `INSERT INTO transactions (categoryId, categoryName, date, nominal, note)
     VALUES (?, ?, ?, ?, ?)`,
    [categoryId, categoryName, date, nominal, note || null]
  );
};

// Ambil semua data
export const getTransactions = async () => {
  const result = await db.getAllAsync(
    "SELECT * FROM transactions ORDER BY date DESC"
  );
  return result;
};

// Update transaksi
export const updateTransaction = async (
  id: number,
  categoryId: string,
  categoryName: string,
  date: string,
  nominal: string,
  note?: string
) => {
  await db.runAsync(
    `UPDATE transactions 
     SET categoryId=?, categoryName=?, date=?, nominal=?, note=?
     WHERE id=?`,
    [categoryId, categoryName, date, nominal, note || null, id]
  );
};

// Delete transaksi
export const deleteTransaction = async (id: number) => {
  await db.runAsync("DELETE FROM transactions WHERE id=?", [id]);
};

// Delete banyak transaksi berdasarkan tanggal tertentu
export const deleteTransactionsByDate = async (date: string) => {
  await db.runAsync("DELETE FROM transactions WHERE date=?", [date]);
};

export const getTransactionById = async (id: number | string) => {
  const result = await db.getFirstAsync(
    "SELECT * FROM transactions WHERE id=?",
    [id]
  );
  return result; // kalau ada -> object transaksi, kalau nggak ada -> null
};
export const getTransactionByDate = async (date: string) => {
  const result = await db.getAllAsync(
    "SELECT * FROM transactions WHERE date=?",
    [date]
  );
  return result; // kalau ada -> object transaksi, kalau nggak ada -> null
};
