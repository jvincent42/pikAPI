import sqlite3 from 'sqlite3'
import loki from 'lokijs'

// Open SQlite Database
let sdb = new sqlite3.Database('./data/pokebase.sqlite', sqlite3.OPEN_READONLY)
// Open a loki Database
let ldb = new loki('./data/pokebase.json')

const loadAllPokemons = (cb) => {
  sdb.all('SELECT * FROM pokemon', (err, rows) => {
    const pokemon = ldb.addCollection('pokemon')
    console.log(rows)
    cb()
    for (let row of rows) {
      pokemon.insert({
        id: row.id,
        name: row.identifier
      })
    }
    console.log('loki collection filled')
    cb()
  })
}

loadAllPokemons(() => {
  const pkmn = ldb.getCollection('pokemon')
  // const rndm = pkmn.find({name: 'pikachu'})
  // console.log(rndm)
})
