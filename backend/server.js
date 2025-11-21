const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE_URL like: postgres://user:password@host:5432/dbname
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://app:apppass@db:5432/appdb";
const pool = new Pool({ connectionString: DATABASE_URL });

async function init() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const { rows } = await pool.query("SELECT COUNT(*)::int AS c FROM users");
  if (rows[0].c === 0) {
    await pool.query(
      "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com'), ('Carol', 'carol@example.com')"
    );
  }
}
init().catch((err) => {
  console.error("DB init error:", err);
  process.exit(1);
});

app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "db_query_failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
