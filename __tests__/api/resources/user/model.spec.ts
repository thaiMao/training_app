import { User, userSchema } from 'resources'

describe('userSchema', () => {
  test.skip('has a property called name', () => {
    expect(userSchema.name).toBeTruthy()
  })

  test.skip('name property is a type of String', () => {
    expect(userSchema.name.type).toEqual(String)
  })

  test.skip('name property is required', () => {
    expect(userSchema.name.required[0]).toBe(true)
  })

  test.skip('name property value must be unique', () => {
    expect(userSchema.name.unique).toBe(true)
  })

  test.skip('has a property called passwordHash', () => {
    expect(userSchema.passwordHash).toBeTruthy()
  })

  test.skip('passwordHash property is a type of String', () => {
    expect(userSchema.passwordHash.type).toEqual(String)
  })

  test.skip('passwordHash property is required', () => {
    // expect(userSchema.passwordHash.required[0]).toBe(true)
  })

  test.skip('has a property called age', () => {
    expect(userSchema.age).toBeTruthy()
  })

  test.skip('age property is a type of Number', () => {
    expect(userSchema.age.type).toEqual(Number)
  })
})
