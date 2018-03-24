import faker from 'faker'
import { Advertiser } from 'db/sql/models'

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.name.firstName()
  }

  return Object.assign({}, defaultProps, props)
}

export default async (props = {}) => Advertiser.create(await data(props))
