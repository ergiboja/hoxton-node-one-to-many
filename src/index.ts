import database from 'better-sqlite3'
import { Express } from 'express'


const express = require('express')
const app = express()
const port = 4000
const db = database('./db/setup.db', { verbose: console.log })

const getMuseums = db.prepare(`
SELECT * FROM museums
`);
const getWorks = db.prepare(`
SELECT * FROM works
`);

app.get('/museums', (req, res) => {
    const museums = getMuseums.all()
  res.send(museums)
});
app.get('/works', (req, res) => {
    const works = getWorks.all()
  res.send(works)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})