import { takeLatest, all } from 'redux-saga/effects'
import { TYPES } from 'actions/types'
import { fetchPerson, fetchPlanets } from 'actions/data'

function* saga() {
  yield all([
    takeLatest(TYPES.FETCH_STAR_WARS_PLANETS_REQUEST, fetchPlanets),
    takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, fetchPerson)
  ])
}

export default saga
