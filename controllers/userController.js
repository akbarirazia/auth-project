const { findUserByEmail } = require("../models/User")

const getUserProfile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email)
    res.status(200).json({ user })
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user profile", error: err.message })
  }
}

module.exports = { getUserProfile }
