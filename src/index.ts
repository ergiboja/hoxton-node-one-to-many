import database from 'better-sqlite3'
import { Express } from 'express'



const express = require('express')
const app = express()
const port = 4000
const db = database('./db/setup.db', { verbose: console.log })

const getMuseums = db.prepare(`
SELECT * FROM museums
`);
const getWorksofMuseum = db.prepare(`
SELECT * FROM works WHERE museId=?
`);
const getMuseumofWorks = db.prepare(`
SELECT * FROM museums WHERE id=?
`);
const getMuseumById = db.prepare(`
SELECT * FROM museums WHERE id=@id
`);
const getWorkbyId = db.prepare(`
SELECT * FROM works WHERE id=@id
`);
const getWorks = db.prepare(`
SELECT * FROM works
`);


app.get('/', (req, res) => {
  
  


});

app.get('/museums', (req, res) => {
    const museums = getMuseums.all()
    for (let museum of museums) {
      const work = getWorksofMuseum.all(museum.id );
      museum.works = work;
    }
  res.send(museums)
});
app.get("/museums/:id", (req, res) => {
  const museum = getMuseumById.get(req.params);
  if (museum) {
    const work = getWorksofMuseum.all( museum.id );
    museum.works = work;
    
    res.send(museum);
  } else res.status(404).send({ error: "Museum that u searched is not found" });
});





app.get('/works', (req, res) => {
    const works = getWorks.all()
    for(let work of works){

      const museum = getMuseumofWorks.get(work.id);
      work.museum = museum;
      
    }
    res.send(works)
  
})
app.get("/works/:id", (req, res) => {
  const work = getWorkbyId.get(req.params);
  if (work) {
    const museum = getMuseumofWorks.get(work.id);
    work.museum = museum;
    res.send(work);
  } else res.status(404).send({ error: "Work that u searched is not found" });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})