import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Token untuk pengiriman data ke server dari deleted stopwatch
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Token hilang, silakan login dulu" });

  //proses verfiy token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ error: "Token tidak valid atau sudah kadaluarsa" });
    req.user = user;
    next();
  });
};

// --- ENDPOINT REGISTER ---
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword],
    );

    res.status(201).json({
      message: "Registrasi berhasil!",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// --- ENDPOINT LOGIN ---
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Email atau password salah!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Email atau password salah!" });
    }

    //JWT sign proccess and parse id and email
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }, //update to 3 days
    );
    //parse token to user
    res.status(200).json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

//Send data to database for deleted stopwatch function
app.post("/api/sessions", authenticateToken, async (req, res) => {
  const { name, duration, endTime } = req.body;
  const userId = req.user.id;

  try {
    const newSession = await pool.query(
      "INSERT INTO sessions (user_id, name, duration, end_time) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, name, duration, endTime],
    );
    res.json(newSession.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error saat menyimpan sesi");
  }
});

//Taking data from database base on user unique id
app.get("/api/sessions", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await pool.query(
      "SELECT * FROM sessions WHERE user_id = $1 ORDER BY end_time DESC",
      [userId],
    );

    res.json(history.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error saat mengambil sesi");
  }
});
app.get("/", (req, res) => {
  res.send("Halo dari server Backend!");
});

app.listen(PORT, () => {
  console.log(
    `Server berhasil menyala dan berjalan di http://localhost:${PORT}`,
  );
});
