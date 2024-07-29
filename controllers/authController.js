const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { findUserByEmail, createUser } = require("../models/User")

const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await createUser(name, email, password)
    res.status(201).json({ user })
  } catch (err) {
    res
      .status(500)
      .json({ message: "User registration failed", error: err.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ message: "User login failed", error: err.message })
  }
}

module.exports = { register, login }
