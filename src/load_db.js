import sqlite3 from 'sqlite3'
import loki from 'lokijs'
import R from 'ramda'

////////////////////////////////////////////////////////////////////////////////
// Open SQlite Database
let sdb = new sqlite3.Database('./data/pokebase.sqlite', sqlite3.OPEN_READONLY)
////////////////////////////////////////////////////////////////////////////////

const fields = (obj) => {
  const field = R.map((x) => `${x[1]} AS ${x[0]}`)
  const transform = R.compose(field, R.toPairs)
  return transform(obj).join(', ')
}

export const loadPokeData = (ldb, cb) => {

  const select = {
    'id':         'pokemon.id',
    'name':       'pokemon.identifier',
    'species_id': 'pokemon.species_id',
    'species':    'pokemon_species.identifier',

  }
  const tables    = 'pokemon JOIN pokemon_species'
  const predicate = 'pokemon.species_id = pokemon_species.id'

  sdb.all(`SELECT ${fields(select)} FROM ${tables} ON ${predicate}`,
    (err, rows) => {
      if (err) throw err
      ldb.addCollection('pokemon').insert(rows)
      cb()
    }
  )

}
