const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const { createUserTable } = require("./models/User")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config()

const app = express()
app.use(bodyParser.json())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  await createUserTable()
  console.log(`Server running on port ${PORT}`)
})
