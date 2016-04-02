'use strict'

import {expect} from 'chai'

import loki from 'lokijs'
import {loadPokeData} from '../src/load_db'

// Database Load
describe('loadPokeData', () => {

  let ldb = new loki('./test/pokebase.json')

  beforeEach((done) => {
    loadPokeData(ldb, done)
  })

  it('loads the pokemon collection', () => {
    const pkmnCollection = ldb.getCollection('pokemon')
    expect(pkmnCollection).to.be.an('object')
  })

})

// Collections tests
describe('Collections are consistent', () => {

  let ldb = new loki('./test/pokebase.json')

  beforeEach((done) => {
    loadPokeData(ldb, done)
  })

  it('pokemon collection has all the pokemons', () => {
    const allPkmns = ldb.getCollection('pokemon').find({})
    expect(allPkmns.length).to.equal(811)
  })

})
