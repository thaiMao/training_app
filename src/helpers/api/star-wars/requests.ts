require('es6-promise').polyfill()
require('isomorphic-fetch')
import { createMethod } from 'helpers/api/helpers'
import { PEOPLE_URL, PLANETS_URL } from './urls'

// TODO Dynamically import fetch alternative when on the server
export const fetchPeople = fetch(PEOPLE_URL)
export const fetchPlanets = fetch(PLANETS_URL)
