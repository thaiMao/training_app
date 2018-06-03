import { TYPES } from 'actions/types'

export type State = {
  people: Array<any>
  planets: Array<any>
}

interface ActionType {
  type: string
  payload: any
}

const DEFAULT_STATE: State = {
  people: [],
  planets: []
}

function setPersons(state: State, action: ActionType) {
  return Object.assign({}, state, { people: action.payload })
}

function setPlanets(state: State, action: ActionType) {
  return Object.assign({}, state, { planets: action.payload })
}

const rootReducer = (state = DEFAULT_STATE, action: ActionType) => {
  switch (action.type) {
    case TYPES.FETCH_STAR_WARS_SUCCESS:
      return setPersons(state, action)
    case TYPES.FETCH_STAR_WARS_PLANETS_SUCCESS:
      return setPlanets(state, action)
    default:
      return state
  }
}

export default rootReducer
