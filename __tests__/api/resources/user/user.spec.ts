import { runQuery, dropDb } from 'modules/helpers'
import { User } from 'resources'

describe('User', () => {
  let user: any

  beforeEach(async () => {
    await dropDb()
    user = await User.create({ username: 'Bob', passwordHash: '123' })
  })

  afterEach(async () => {
    await dropDb()
  })

  test('should get user', async () => {
    const result = await runQuery(
      `
      {
        getUser {
          id
          name
        }
      }
    `,
      {},
      user
    )

    expect(result.errors).toBeFalsy()
    expect(result.data.getUser).toBeInstanceOf(Object)
    expect(result.data.getUser.id).toEqual(user.id.toString())
  })

  test('should update user', async () => {
    const newName = 'newName'

    const result = await runQuery(
      `
      mutation UpdateUser($input: UpdatedUser){
        updateUser(input: $input) {
          id
          name
        }
      }
    `,
      { input: { id: user.id, name: newName }, user },
      user
    )

    expect(result.errors).toBeFalsy()
    expect(result.data.updateUser).toBeInstanceOf(Object)
    expect(result.data.updateUser.id).toEqual(user.id.toString())
  })
})

// TODO Test for remove and create
