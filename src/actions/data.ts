import { call, getContext, put, take, select } from 'redux-saga/effects'
import { TYPES } from './types'
import { state } from 'actions/selectors'
import { Api } from 'helpers'

export const api = (url: string) => fetch(url).then((res: any) => res.json())

export const fetchStarWarsRequest = () => ({
  type: TYPES.FETCH_STAR_WARS_REQUEST
})

export const fetchStarWarsPlanetsRequest = () => ({
  type: TYPES.FETCH_STAR_WARS_PLANETS_REQUEST
})

export const confirmFetchRequest = () => ({
  type: TYPES.CONFIRMATION
})

export function* fetchPerson(action: any) {
  try {
    yield take(TYPES.CONFIRMATION)

    const person = yield call(Api.StarWars.getPeople)

    yield put({ type: TYPES.FETCH_STAR_WARS_SUCCESS, payload: person.results })
    const selector = yield select(state.getStarWars)
  } catch (e) {
    console.log(e)
  }
}

export function* fetchPlanets(action: any) {
  try {
    yield take(TYPES.CONFIRMATION)
    const planets = yield call(api, 'https://swapi.co/api/planets/')
    yield put({
      type: TYPES.FETCH_STAR_WARS_PLANETS_SUCCESS,
      payload: planets.results
    })
    const selector = yield select(state.getStarWars)
  } catch (e) {
    console.log(e)
  }
}
