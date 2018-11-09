export default {
  types: `
    type Inventory {
      id: Int!
      date: String!
      quantity: Int!
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
  `,
  queries: `
    inventories: [Inventory]
    inventory(id: Int!): Inventory
  `,
  mutations: `
    createInventory(input: CreateInventory!): CreateInventoryPayload
    updateInventory(input: UpdateInventory!): UpdateInventoryPayload
    deleteInventory(input: DeleteInventory!): DeleteInventoryPayload
  `,
  inputs: `
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
  `,
};
