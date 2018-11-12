export default {
  types: `

    # A History represents a redemption or attendance in the system.
    # In future this may be changed and split into two different types.
    type History {

      # The ID of the History. This is used to make queries and mutations.
      id: Int!

      # The date in which this History takes/took place.
      date: GraphQLDateTime!

      # The amount of points that this is worth. A positive number of this
      # is an attendance, a negative number if this is a redemption.
      points: Int!

      # Represents what kind of History this is. Must be one of 'attendance'
      # or 'redemption'.
      type: String!

      # Only required if this is a redemption. The Reward associated with a
      # redemption. Null if this is an attendance.
      reward: Reward

      # The User that this History belongs to.
      user: User!

    }

    # Returned from the createAttendance mutation.
    type CreateAttendancePayload {

      # The History that was created.
      history: History

    }

    # Returned from the deleteAttendance mutation.
    type DeleteAttendancePayload {

      # The History that was deleted.
      history: History

    }

    # Returned from the createRedemption mutation.
    type CreateRedemptionPayload {

      # The History that was created.
      history: History

    }

    # Returned from the deleteRedemption mutation.
    type DeleteRedemptionPayload {

      # The History that was deleted.
      history: History

    }
  `,
  // no root queries exist for History.
  queries: `
    
  `,
  mutations: `
    
    # Creates a new attendance History in the system.
    createAttendance(input: CreateAttendance): CreateAttendancePayload

    # Deletes an existing attendance History in the system.
    deleteAttendance(input: DeleteAttendance): DeleteAttendancePayload

    # Creates a new redemption History in the system.
    createRedemption(input: CreateRedemption): CreateRedemptionPayload

    # Deletes an existing redemption History in the system.
    deleteRedemption(input: DeleteRedemption): DeleteRedemptionPayload
  `,
  inputs: `
    
    # Used to run the createAttendance mutation.
    input CreateAttendance {

      # The date that the signed in User will attend a meal.
      date: GraphQLDateTime!

    }

    # Used to run the deleteAttendance mutation.
    input DeleteAttendance {

      # The ID of the attendance History to delete.
      id: Int!

    }

    # Used to run the createRedemption mutation.
    input CreateRedemption {

      # The ID of the reward that is being purchased.
      rewardId: Int!

    }

    # Used to run the deleteRedemption mutation.
    input DeleteRedemption {

      # The ID of the redemption History to be deleted.
      id: Int!
      
    }
  `,
};
