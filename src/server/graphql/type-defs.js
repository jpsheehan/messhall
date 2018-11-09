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
    inventories: [Inventory]
    inventory(id: Int!): Inventory
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    tokens: [Token]!
    points: Int!
    history: [History]!
  }

  type Token {
    id: Int!
    uuid: String!
    user: User!
  }

  type Mutation {
    logIn(input: LogIn!): LogInPayload
    deleteToken(input: DeleteToken!): DeleteTokenPayload

    createUser(input: CreateUser!): CreateUserPayload
    updateUser(input: UpdateUser!): UpdateUserPayload
    deleteUser(input: DeleteUser!): DeleteUserPayload

    createReward(input: CreateReward!): CreateRewardPayload
    updateReward(input: UpdateReward!): UpdateRewardPayload
    deleteReward(input: DeleteReward!): DeleteRewardPayload

    createInventory(input: CreateInventory!): CreateInventoryPayload
    updateInventory(input: UpdateInventory!): UpdateInventoryPayload
    deleteInventory(input: DeleteInventory!): DeleteInventoryPayload
  }

  type History {
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
    history: [History]!
    inventory: [Inventory]!
  }

  type Inventory {
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

  type CreateRewardPayload {
    reward: Reward
  }

  type UpdateRewardPayload {
    reward: Reward
  }

  type DeleteRewardPayload {
    reward: Reward
  }

  type CreateInventoryPayload {
    inventory: Inventory
  }

  type UpdateInventoryPayload {
    inventory: Inventory
  }

  type DeleteInventoryPayload {
    inventory: Inventory
  }

  input LogIn {
    email: String
    password: String
  }

  input CreateUser {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
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

  input CreateReward {
    name: String!
    cost: Int!
  }

  input UpdateReward {
    id: Int!
    patch: CreateReward
  }

  input DeleteReward {
    id: Int!
  }

  input CreateInventory {
    quantity: Int!
    rewardId: Int!
  }

  input UpdateInventory {
    id: Int!
    patch: CreateInventory
  }

  input DeleteInventory {
    id: Int!
  }
`;
