#!/usr/bin/env node
import readline from "readline"
import { addDayEntry } from "./data.js"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const questions = [
  { key: "date", text: "Päivämäärä (YYYY-MM-DD): " },
  { key: "weekday", text: "Viikonpäivä (ma–su): " },
  { key: "weather_type", text: "Sää (aurinko/pilvinen/sade/pakkaslumi): " },
  { key: "temperature_c", text: "Lämpötila (°C): " },
  { key: "sleep_hours", text: "Nukutut tunnit: " },
  { key: "work_hours", text: "Tehokas työaika (h): " },
  { key: "distractions_count", text: "Häiriöiden määrä: " },
  { key: "mood_level", text: "Fiilis (1–5): " },
  { key: "productivity_level", text: "Tuottavuus (1–5): " },
]

const answers = {}

function ask(i) {
  if (i >= questions.length) {
    addDayEntry(answers).then(() => {
      console.log("Tallennettu:", answers)
      rl.close()
    })
    return
  }

  rl.question(questions[i].text, ans => {
    answers[questions[i].key] = ans
    ask(i + 1)
  })
}

ask(0)
