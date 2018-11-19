export default {
  types: `

    # Represents a reward that a User may buy using their accumulated points.
    type Reward {

      # The ID of the Reward. Used to identify the Reward in queries/mutations.
      id: Int!

      # The name of the Reward.
      name: String!

      # How many points the Reward costs for a User to buy it.
      cost: Int!

      # How many physical Rewards of this type remain in stock.
      stock: Int!

      # The full redemption history of this Reward.
      history: [History]!

      # The full inventory history of this Reward.
      inventory: [Inventory]!

    }
    
    # Contains the Reward returned by the createReward mutation.
    type CreateRewardPayload {

      # The Reward that was created.
      reward: Reward

    }
  
    # Contains the Reward returned by the updateReward mutation.
    type UpdateRewardPayload {

      # The updated Reward.
      reward: Reward

    }
  
    # Contains the Reward that was deleted from the system by the deleteReward
    # mutation.
    type DeleteRewardPayload {

      # The deleted Reward.
      reward: Reward

    }
  `,
  queries: `

    # Requires any role. Returns a list of all Rewards in the system.
    rewards: [Reward]

    # Requires any role. Returns a single Reward by its ID.
    reward(id: Int!): Reward
  `,
  mutations: `
    
    # Requires manager or admin roles. Creates a new Reward.
    createReward(input: CreateReward!): CreateRewardPayload

    # Requires manager or admin roles. Updates an existing Reward.
    updateReward(input: UpdateReward!): UpdateRewardPayload

    # Requires manager or admin roles. Deletes an existing Reward.
    deleteReward(input: DeleteReward!): DeleteRewardPayload
  `,
  inputs: `
    
    # Used to run the createReward mutation.
    input CreateReward {

      # The name of the Reward.
      name: String!

      # How many points the Reward should cost the User.
      cost: Int!

    }

    # Used to run the updateReward mutation.
    input UpdateReward {

      # The ID of the reward to be updated.
      id: Int!

      # The information to changed.
      patch: CreateReward

    }

    # Used to run the deleteReward mutation.
    input DeleteReward {

      # The ID of the reward to be deleted.
      id: Int!

    }
  `,
};
