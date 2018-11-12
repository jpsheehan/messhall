export default {
  types: `
    # The Token object belongs to one user and represents a login session. A
    # user can be logged in via the createToken mutation and logged out via the
    # deleteToken mutation.
    type Token {

      # The unique ID of the Token. Use this when using queries and mutations
      # that require a Token ID.
      id: Int!

      # A unique ID that references this Token. Considering removing this from
      # future releases.
      uuid: String!

      # The User that the Token belongs to.
      user: User!
    }
    
    # Contains the User returned after the token is deleted. This could be
    # useful for the client to know.
    type DeleteTokenPayload {

      # The User that the deleted Token belonged to.
      user: User
    }

    # Contains the User, Token and authToken objects. This is returned from the
    # createToken mutation.<br />
    # The authToken is a string
    # that contains the token that should be inserted into the "Authorization"
    # header for every subsequent request as follows:
    # <pre>Authorization: Bearer &lt;authToken&gt;</pre>
    type CreateTokenPayload {

      # The User that this Token belongs to and that has been "signed in".
      user: User

      # The bearer token string to be inserted into the authorization header
      # as described above.
      authToken: String

      # The actual Token object. It may be useful for the client to store the
      # id property for the purposes of signing out (the deleteToken mutation).
      token: Token
    }
  `,
  queries: `
    
    # Requires admin role. Gets a list of all active Tokens in the system.
    tokens: [Token]

    # Requires admin role. Gets any Token in the system by the Token ID.<br />
    # Requires any role. Gets any Token in the system that belongs to the
    # currently signed in User.
    token(id: Int!): Token
  `,
  mutations: `
    
    # Creates a Token for a User. This is used to "sign in" a User.
    createToken(input: CreateToken!): CreateTokenPayload

    # Creates a Token for a manager or admin User only. This is used to
    # "sign in" a User. If a user attempts to run this mutation an error will
    # be returned.
    createSuperToken(input: CreateToken!): CreateTokenPayload

    # Requires any role. Deletes a Token from the system. The Token must belong
    # to the currently signed in User.
    deleteToken(input: DeleteToken!): DeleteTokenPayload
  `,
  inputs: `
    
    # Used to create a new Token, or sign a User in.
    input CreateToken {

      # The email address of the User that wishes to sign in.
      email: String

      # The password of the User that wishes to sign in.
      password: String
      
    }

    # Used to delete an exisiting Token from the system.
    input DeleteToken {

      # The ID of the Token to be deleted.
      id: Int!

    }
  `,
};
