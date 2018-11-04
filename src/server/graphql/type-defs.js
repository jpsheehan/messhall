export default `
  schema {
    query: Query
    mutation: Mutation
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

  type Mutation {
    logIn(input: LogIn!): LogInPayload
    createUser(input: CreateUser!): CreateUserPayload
    updateUser(input: UpdateUser!): UpdateUserPayload
    deleteUser(input: DeleteUser!): DeleteUserPayload
    deleteToken(input: DeleteToken!): DeleteTokenPayload
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

  type CreateUserPayload {
    user: User
  }

  type DeleteUserPayload {
    user: User
  }

  type UpdateUserPayload {
    user: User
  }

  type DeleteTokenPayload {
    user: User
  }

  type LogInPayload {
    user: User
    token: String
  }

  input LogIn {
    name: String
    password: String
  }

  input CreateUser {
    name: String
    email: String
    role: String
    password: String
  }

  input UpdateUser {
    id: Int!
    patch: CreateUser
  }

  input DeleteUser {
    id: Int!
  }

  input DeleteToken {
    id: Int!
  }
`;
