// gen-fake-data.js
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// LowDB setup
const adapter = new JSONFile('data.json')
const db = new Low(adapter, { days: [] })

// Random helpers
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const weatherTypes = ["aurinko", "pilvinen", "sade", "tuuli", "sumu"]

// Luo päivämäärälista
function generateDates(count) {
  const dates = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push(d)
  }
  return dates.reverse()
}

async function generateFakeData(days = 300) {
  await db.read()

  const dates = generateDates(days)

  const newData = dates.map(d => {
    const iso = d.toISOString().split("T")[0]
    const weekday = ["su","ma","ti","ke","to","pe","la"][d.getDay()]

    return {
      date: iso,
      weekday,
      weather_type: pick(weatherTypes),
      temperature_c: rand(-5, 20),
      sleep_hours: rand(4, 9),
      work_hours: rand(0, 10),
      distractions_count: rand(0, 8),
      mood_level: rand(1, 5),
      productivity_level: rand(1, 5)
    }
  })

  db.data.days = newData
  await db.write()

  console.log(`OK, generoitu ${days} fakepäivää data.json-tiedostoon`)
}

generateFakeData(300)