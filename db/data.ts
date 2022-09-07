import database from 'better-sqlite3'
const db = database('./db/setup.db', { verbose: console.log })

const museums = [
    {
        name:"Tokyo National Museum",
        city: "Taito "
    },
    {
        name:"National Museum of China",
        city: "Beijing"
    },
    {
        name:"National Museum of the Philippines",
        city: "Manila"
    },
    {
        name:"Anne Frank House",
        city: "Amsterdam"
    }
];
const works = [
    {
        museId:2,
        name:"The Rosetta Stone",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_25679.jpg"

    },
    {
        museId:4,
        name:"The Hope Diamond Necklace",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_11081.jpg",
        

    },
    {
        museId:3,
        name:"The Parthenon Frieze",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_39329.jpg",
        

    },
    {
        museId:1,
        name:"The Mona Lisa",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_30027.jpg",
       

    },
    {
        museId:2,
        name:"Babylonian Tablet",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_4988.jpg",
        

    },
    {
        museId:1,
        name:"The Starry Night",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_10605.jpg",
        

    },
    {
        museId:3,
        name:"1849 Double Eagle $20 Coin",
        picture:"https://assets.alot.com/assets/common/entertainment/u12806_slide_32697.jpg",
       

    },
];
const createMuseumsTbl=db.prepare(`
CREATE TABLE IF NOT EXISTS museums (
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY(id)
);`)
createMuseumsTbl.run()

const insertMuesumdata = db.prepare(`
INSERT INTO museums (name,city) VALUES(@name,@city)



`)
for (let museum of museums){insertMuesumdata.run(museum)}
const createWorksTbl=db.prepare(`
CREATE TABLE IF NOT EXISTS works (
    id INTEGER,
    name TEXT NOT NULL,
    picture TEXT NOT NULL,
    museId INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (museId) REFERENCES museums(id)
);`)
createWorksTbl.run();
const insertWorksdata = db.prepare(`
INSERT INTO works (name,picture,museId) VALUES(@name,@picture,@museId)



`)

for(let work of works){
   insertWorksdata.run(work)
}
