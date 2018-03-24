import { runQuery, dropDb } from 'modules/helpers'
import { User } from 'resources'

describe('User', () => {
  let user: any

  beforeEach(async () => {
    await dropDb()
    user = await User.create({ name: 'Bob' })
  })

  afterEach(async () => {
    await dropDb()
  })

  test('should get user', async () => {
    console.log(user)
    const result = await runQuery(
      `
      query($id: ID!){
        getUser(id: $id) {
          id
          name
        }
      }
    `,
      {
        id: user.id
      },
      user
    )

    expect(result.errors).toBeFalsy()
    expect(result.data.getUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String)
      })
    )
    expect(result.data.getUser.id).toEqual(user._id.toString())
  })

  test('should update user', async () => {
    const newName = 'newName'

    const result = await runQuery(
      `
      mutation UpdateUser($input: UpdatedUser!){
        updateUser(input: $input) {
          id
          name
        }
      }
    `,
      { input: { name: newName } },
      user
    )

    expect(result.errors).toBeFalsy()
    expect(result.data.updateUser).toEqual(
      expect.objectContaining({ id: user.id, name: newName })
    )
    expect(result.data.updateUser.id).toEqual(user.id.toString())
  })
})

// TODO Test for remove and create
