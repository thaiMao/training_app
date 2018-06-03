import { call, put } from 'redux-saga/effects'
import { TYPES } from 'actions/types'
import { fetchPerson } from 'actions/data'
import { Api } from 'helpers'

describe('fetchPerson', () => {
  beforeEach(() => {
    ;(fetch as any).resetMocks()
  })

  test('makes an request to get People from the Star Wars API', () => {
    const personGen = fetchPerson({ type: TYPES.FETCH_STAR_WARS_REQUEST })
    personGen.next()
    const value = personGen.next().value

    expect(value).toEqual(call(Api.StarWars.getPeople))
  })
})
