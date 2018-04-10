import Sequelize from 'sequelize'
import database from 'db/sql/models/db'
import { runQuery, dropDb } from 'modules/helpers'
import { User } from 'resources'
import { Advertiser } from 'db/sql/models'

describe.skip('Advertiser', () => {
  let user: any

  beforeEach(async () => {
    await dropDb()
    user = await User.create({ name: 'Bob' })
  })

  afterEach(async () => {
    await dropDb()
  })

  xit('should create an Advertiser', async () => {
    const result = await runQuery(
      `
      mutation CreateAdvertiser($input: CreateAdvertiser!){
        createAdvertiser(input: $input) {
          id
          name
        }
      }
    `,
      { input: { name: 'Jack' } },
      user
    )

    expect(result.data.createAdvertiser).toEqual(
      expect.objectContaining({ name: 'Jack' })
    )
  })
})
