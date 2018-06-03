import { combineReducers } from 'redux'
import { default as exerciseReducer } from 'reducers/exercises'
import { default as starWars } from 'reducers/data'

export default combineReducers({ starWars, exerciseReducer })
