export default {
  types: `
    type History {
      id: Int!
      date: GraphQLDateTime!
      points: Int!
      type: String!
      reward: Reward
      user: User!
    }

    type CreateAttendancePayload {
      history: History
    }

    type DeleteAttendancePayload {
      history: History
    }

    type CreateRedemptionPayload {
      history: History
    }

    type DeleteRedemptionPayload {
      history: History
    }
  `,
  queries: `

  `,
  mutations: `
    createAttendance(input: CreateAttendance): CreateAttendancePayload
    deleteAttendance(input: DeleteAttendance): DeleteAttendancePayload
    createRedemption(input: CreateRedemption): CreateRedemptionPayload
    deleteRedemption(input: DeleteRedemption): DeleteRedemptionPayload
  `,
  inputs: `
    input CreateAttendance {
      date: GraphQLDateTime!
    }

    input DeleteAttendance {
      id: Int!
    }

    input CreateRedemption {
      rewardId: Int!
    }

    input DeleteRedemption {
      id: Int!
    }
  `,
};
