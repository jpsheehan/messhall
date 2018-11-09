export default {
  types: `
    type User {
      id: Int!
      firstName: String!
      lastName: String!
      name: String!
      email: String!
      role: String!
      tokens: [Token]!
      points: Int!
      history: [History]!
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
  `,
  queries: `
    users: [User]
    user(id: Int!): User
  `,
  mutations: `
    createUser(input: CreateUser!): CreateUserPayload
    updateUser(input: UpdateUser!): UpdateUserPayload
    deleteUser(input: DeleteUser!): DeleteUserPayload
  `,
  inputs: `
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
  `,
};
