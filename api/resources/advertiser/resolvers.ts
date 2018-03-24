import { Advertiser } from 'db/sql/models'
import { mergeDeep } from 'immutable'
import { Sequelize } from 'sequelize'

function getAdvertiser(_: any, { id }: any) {}

async function getAllAdvertisers(_: any) {
  const advertisers = await Advertiser.findAll({
    limit: 1000,
    order: [['createdAt', 'ASC']]
  })

  if (!advertisers) {
    // TODO Handle error properly
    new Error('No advertisers found')
  } else {
    return advertisers
  }
}

async function createAdvertiser(_: any, { input }: any) {
  return await Advertiser.create(input)
}

async function updateAdvertiser(_: any, { input }: any) {
  const { id, ...update } = input

  const advertiser = await Advertiser.findById(id)

  if (!advertiser) {
    // TODO Handle error properly
    new Error('No advertiser id found')
  } else {
    const updatedAdvertiser: any = mergeDeep(advertiser, update)
    return updatedAdvertiser.save()
  }
}

function removeAdvertiser(_: any, { id }: any) {
  return Advertiser.destroy({
    where: {
      id
    }
  })
}

const advertiserResolvers = {
  Query: {
    getAdvertiser,
    getAllAdvertisers
  },
  Mutation: {
    createAdvertiser,
    updateAdvertiser,
    removeAdvertiser
  }
}

export default advertiserResolvers
