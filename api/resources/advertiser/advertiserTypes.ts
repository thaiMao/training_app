const advertiserTypes = `
  type Advertiser {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  
  input CreateAdvertiser {
    name: String!
  }
  
  input UpdateAdvertiser {
    name: String!
  }
  
  extend type Query {
    getAdvertiser(id: ID!): Advertiser!
    getAllAdvertisers: [Advertiser]!
  }
  
  extend type Mutation {
    createAdvertiser(input: CreateAdvertiser!): Advertiser!
    updateAdvertiser(input: UpdateAdvertiser!): Advertiser!
    removeAdvertiser(id: ID!): Advertiser!
  }
`

export default advertiserTypes
