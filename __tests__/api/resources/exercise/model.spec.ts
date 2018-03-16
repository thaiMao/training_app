import { Exercise, exerciseSchema } from 'resources'

describe('exerciseSchema', () => {
  test('has a property called name', () => {
    expect(exerciseSchema.name).toBeTruthy()
  })

  test('name property is a type of String', () => {
    expect(exerciseSchema.name.type).toEqual(String)
  })

  test('name property is required', () => {
    expect(exerciseSchema.name.required[0]).toBe(true)
  })

  test('has a property called muscle', () => {
    expect(exerciseSchema.muscle).toBeTruthy()
  })

  test('muscle property is a type of String', () => {
    expect(exerciseSchema.muscle.type).toEqual(String)
  })

  test('has a property called goal', () => {
    expect(exerciseSchema.goal).toBeTruthy()
  })
})
