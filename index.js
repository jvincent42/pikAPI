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
const fetchAllPokemons = (req, res) => {
  res(ldb.getCollection('pokemon').find({}))
}
const fetchOnePokemon = (req, res) => {
  res(ldb.getCollection('pokemon').find({id: parseInt(req.params.id)}))
}
const fetchAllSpecies = (req, res) => {
  res(ldb.getCollection('pokemon').find({species_id: parseInt(req.params.id)}))
}
const fetchAllBerries = (req, res) => {
  res(ldb.getCollection('berry').find({}))
}
const fetchOneBerry = (req, res) => {
  res(ldb.getCollection('berry').find({id: parseInt(req.params.id)}))
}

// Routes
server.route({
  method:  'GET',
  path:    '/pokemons',
  handler: fetchAllPokemons,
})
server.route({
  method:  'GET',
  path:    '/pokemon/{id}',
  handler: fetchOnePokemon,
})
server.route({
  method:  'GET',
  path:    '/species/{id}',
  handler: fetchAllSpecies,
})
server.route({
  method:  'GET',
  path:    '/berries',
  handler: fetchAllBerries,
})
server.route({
  method:  'GET',
  path:    '/berry/{id}',
  handler: fetchOneBerry,
})

// Start server
loadPokeData(ldb, () => {
  console.log('Database loaded in lokiDB')
  server.start((err) => {
    if (err) throw err
    console.log('Server running at : ', server.info.uri)
  })
})
