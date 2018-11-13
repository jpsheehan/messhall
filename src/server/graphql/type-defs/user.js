export default {
  types: `

    # A User is any user, manager or administrator that has access to this
    # system. A User can access the system by the phone app (user) or by the
    # web portal (administrators/managers).
    type User {

      # A unique ID that identifies the User in the system. This will be
      # required for any queries or mutations that need an ID for the User.
      id: Int!

      # The first name of the User.
      firstName: String!

      # The last name of the User.
      lastName: String!

      # The full name of the User. This is simply a concatenation of the
      # firstName and lastName properties.
      name: String!

      # The email address of the User. This may be used to send the user
      # password reset emails and such.
      email: String!

      # Must be one of 'user', 'manager' or 'admin'. Depending on what kind of
      # permissions the User requires.
      role: String!

      # Contains a list of all the active Tokens the User has. Deleting all of
      # these would effectively sign a User out of all sessions.
      tokens: [Token]!

      # The current number of points that a User has to spend.
      points: Int!

      # A total accounting of all the User's redemptions and attendances.
      history: [History]!

    }

    # Returned from the createUser mutation.
    type CreateUserPayload {

      # The User that was just created.
      user: User

    }
  
    # Returned from the deleteUser mutation.
    type DeleteUserPayload {

      # The User that was just deleted.
      user: User

    }
  
    # Returned from the updateUser mutation
    type UpdateUserPayload {

      # The updated User.
      user: User

    }
  `,
  queries: `
    
    # Requires admin role. Returns a list of all Users in the system.
    users: [User]

    # Requires admin role. Returns a single User based on ID.<br />
    # Requires user or manager roles. Returns the signed in User based on ID.
    user(id: Int!): User
  `,
  mutations: `
    
    # Requires admin role. Creates a new User in the system.
    createUser(input: CreateUser!): CreateUserPayload

    # Requires admin role. Updates an existing User.
    updateUser(input: UpdateUser!): UpdateUserPayload

    # Requires admin role. Deletes an existing User.
    deleteUser(input: DeleteUser!): DeleteUserPayload
  `,
  inputs: `
    
    # Used for the createUser and updateUser mutations.
    input CreateUser {

      # The first name of the User.
      firstName: String

      # The last name of the User.
      lastName: String

      # The email address of the User.
      email: String

      # The role the User is to have. Must be one of 'user', 'manager' or
      # 'admin'
      role: String

      # The password that the User is to have.
      password: String

    }

    # Used for the updateUser mutation.
    input UpdateUser {

      # The ID of the User to update.
      id: Int!

      # The information of the User that is to be changed.
      patch: CreateUser

    }

    # Used for the deleteUser mutation.
    input DeleteUser {

      # The ID of the User to be deleted.
      id: Int!
      
    }
  `,
};
