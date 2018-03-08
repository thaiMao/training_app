import { User } from 'resources/user'
import { controllers } from 'modules//query'
import { dropDb } from 'modules/helpers'

describe('Modules', () => {
  beforeEach(async () => {
    await dropDb()
  })

  afterEach(async () => {
    await dropDb()
  })

  describe('query', () => {
    describe('createOne', () => {
      it('should create a document', async () => {
        const result = await controllers.createOne(User, {
          name: 'Fred',
          passwordHash: '1234abcd',
          age: 42
        })

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
        expect(result.name).toBe('Fred')
      })
    })
  })
})
