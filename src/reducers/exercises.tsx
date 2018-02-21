import { SET_EXERCISE } from 'actions'

export interface State {
  exercises: Array<any>
  exercise: string
}

interface Action {
  type: string
  payload: any
}

const DEFAULT_STATE: State = {
  exercises: ['Deadlift', 'Squat', 'Benchpress'],
  exercise: undefined
}

const setExercise = (state: State, action: Action) => {
  return Object.assign({}, state, { exercise: action.payload })
}

const rootReducer = (state = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case SET_EXERCISE:
      return setExercise(state, action)
    default:
      return state
  }
}

export default rootReducer
