const pool = require("../config/db")
const bcrypt = require("bcryptjs")

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255)
    )
  `
  await pool.query(queryText)
}

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ])
  return result.rows[0]
}

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  )
  return result.rows[0]
}

module.exports = { createUserTable, findUserByEmail, createUser }
