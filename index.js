'use strict'

import hapi from 'hapi'
import loki from 'lokijs'
import {loadPokeData} from './src/load_db'

// Open a loki Database
let ldb = new loki('./data/pokebase.json')

// Server Init
const server = new hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 1338
})

// Actions
const fetchAll = (req, res) => {
  res(ldb.getCollection('pokemon').find({}))
}
const fetchOne = (req, res) => {
  res(ldb.getCollection('pokemon').find({id: parseInt(req.params.id)}))
}

// Routes
server.route({
  method:  'GET',
  path:    '/pokemons',
  handler: fetchAll,
})
server.route({
  method:  'GET',
  path:    '/pokemon/{id}',
  handler: fetchOne,
})

// Start server
loadPokeData(ldb, () => {
  console.log('Database loaded in lokiDB')
  server.start((err) => {
    if (err) throw err
    console.log('Server running at : ', server.info.uri)
  })
})


//
// const pkmn = ldb.getCollection('pokemon')
// const rndm = pkmn.find({name: 'pikachu'})
// console.log(rndm)
// return res(rndm)
