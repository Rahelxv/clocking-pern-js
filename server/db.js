import pkg from "pg";
import dotenv from "dotenv";

// Membaca isi file .env
dotenv.config();

const { Pool } = pkg;

// Mengatur tiket koneksi ke database berdasarkan isi .env
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Mengetes koneksi
pool
  .connect()
  .then(() => console.log("✅ Berhasil terhubung ke database PostgreSQL!"))
  .catch((err) =>
    console.error("❌ Gagal terhubung ke database:", err.message),
  );

export default pool;
