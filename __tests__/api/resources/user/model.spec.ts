import { User, userSchema } from 'resources'

describe('userSchema', () => {
  test('has a property called name', () => {
    expect(userSchema.name).toBeTruthy()
  })

  test('name property is a type of String', () => {
    expect(userSchema.name.type).toEqual(String)
  })

  test('name property is required', () => {
    expect(userSchema.name.required[0]).toBe(true)
  })

  test('name property value must be unique', () => {
    expect(userSchema.name.unique).toBe(true)
  })

  test('has a property called passwordHash', () => {
    expect(userSchema.passwordHash).toBeTruthy()
  })

  test('passwordHash property is a type of String', () => {
    expect(userSchema.passwordHash.type).toEqual(String)
  })

  test('passwordHash property is required', () => {
    expect(userSchema.passwordHash.required[0]).toBe(true)
  })

  test('has a property called age', () => {
    expect(userSchema.age).toBeTruthy()
  })

  test('age property is a type of Number', () => {
    expect(userSchema.age.type).toEqual(Number)
  })
})
