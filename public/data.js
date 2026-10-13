import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('data.json')
const db = new Low(adapter, { days: [] })

export async function addDayEntry(entry) {
  await db.read()
  db.data.days.push(entry)
  await db.write()
}

export async function getAllData() {
  await db.read()
  return db.data.days
}