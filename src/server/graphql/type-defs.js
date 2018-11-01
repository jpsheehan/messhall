export default `
  schema {
    query: Query
  }

  type Query {
    users: [User]
    user(id: Int!): User
    tokens: [Token]
    token(id: Int!): Token
    rewards: [Reward]
    reward(id: Int!): Reward
    products: [Product]
    product(id: Int!): Product
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    tokens: [Token]!
    points: Int!
    history: [RewardHistory]!
  }

  type Token {
    id: Int!
    uuid: String!
    user: User!
  }

  type RewardHistory {
    id: Int!
    date: String!
    points: Int!
    type: String!
    reward: Reward
    user: User!
  }

  type Reward {
    id: Int!
    name: String!
    cost: Int!
    stock: Int!
    redemptions: [RewardHistory]!
    inventory: [Product]!
  }

  type Product {
    id: Int!
    date: String!
    quantity: Int!
  }
`;
