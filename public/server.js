import express from "express"
import bodyParser from "body-parser"
import { addDayEntry, getAllData } from "./data.js"

const app = express()
app.use(bodyParser.json())
app.use(express.static("public"))
//app.use(express.static("."))

app.post("/save", async (req, res) => {
  await addDayEntry(req.body)
  res.json({ status: "ok" })
})

app.get("/data", async (req, res) => {
  const data = await getAllData()
  res.json(data)
})

app.listen(3000, () => console.log("Server running at http://localhost:3000"))
