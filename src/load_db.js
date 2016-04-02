import sqlite3 from 'sqlite3'
import loki from 'lokijs'

////////////////////////////////////////////////////////////////////////////////
// Open SQlite Database
let sdb = new sqlite3.Database('./data/pokebase.sqlite', sqlite3.OPEN_READONLY)
////////////////////////////////////////////////////////////////////////////////

export const loadPokeData = (ldb, cb) => {
  sdb.all('SELECT * FROM pokemon', (err, rows) => {
    const pokemon = ldb.addCollection('pokemon')
    for (let row of rows) {
      pokemon.insert({
        id:         row.id,
        name:       row.identifier,
        species_id: row.species_id,
        height:     row.height,
        weight:     row.weight,
        base_xp:    row.base_experience,
        order:      row.order,
      })
    }
    cb()
  })
}
