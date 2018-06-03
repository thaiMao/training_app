import { createMethod } from 'helpers/api/helpers'
import { fetchPeople, fetchPlanets } from './requests'

export const getPeople = createMethod(fetchPeople)
export const getPlanets = createMethod(fetchPlanets)
