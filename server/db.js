import pkg from "pg";
import dotenv from "dotenv";

// Membaca isi file .env
dotenv.config();

const { Pool } = pkg;

// Mengatur tiket koneksi ke database berdasarkan isi .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Wajib ada supaya bisa konek ke cloud
  },
});

// Mengetes koneksi
pool
  .connect()
  .then(() => console.log("✅ Berhasil terhubung ke database PostgreSQL!"))
  .catch((err) =>
    console.error("❌ Gagal terhubung ke database:", err.message),
  );

export default pool;
