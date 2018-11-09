export default {
  types: `
    type Reward {
      id: Int!
      name: String!
      cost: Int!
      stock: Int!
      history: [History]!
      inventory: [Inventory]!
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
  `,
  queries: `
    rewards: [Reward]
    reward(id: Int!): Reward
  `,
  mutations: `
    createReward(input: CreateReward!): CreateRewardPayload
    updateReward(input: UpdateReward!): UpdateRewardPayload
    deleteReward(input: DeleteReward!): DeleteRewardPayload
  `,
  inputs: `
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
  `,
};
