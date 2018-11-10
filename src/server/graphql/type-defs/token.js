export default {
  types: `
    type Token {
      id: Int!
      uuid: String!
      user: User!
    }
    
    type DeleteTokenPayload {
      user: User
    }

    type CreateTokenPayload {
      user: User
      authToken: String
      token: Token
    }
  `,
  queries: `
    tokens: [Token]
    token(id: Int!): Token
  `,
  mutations: `
    createToken(input: CreateToken!): CreateTokenPayload
    createSuperToken(input: CreateToken!): CreateTokenPayload
    deleteToken(input: DeleteToken!): DeleteTokenPayload
  `,
  inputs: `
    input CreateToken {
      email: String
      password: String
    }

    input DeleteToken {
      id: Int!
    }
  `,
};
