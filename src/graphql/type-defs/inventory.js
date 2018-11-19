export default {
  types: `

    # The Inventory represents stock of a particular Reward coming into the
    # system.
    type Inventory {

      # The ID of the Inventory. This is used to identify this Inventory in
      # queries and mutations.
      id: Int!

      # The date when this Inventory was added to the system.
      date: GraphQLDateTime!

      # How many instances of the Reward were added.
      quantity: Int!

    }

    # Returned from the createInventory mutation.
    type CreateInventoryPayload {

      # The Inventory to add to the system.
      inventory: Inventory

    }
  
    # Returned from the updateInventory mutation.
    type UpdateInventoryPayload {

      # The updated Inventory.
      inventory: Inventory

    }
  
    # Returned from the deleteInventory mutation.
    type DeleteInventoryPayload {

      # The deleted Inventory.
      inventory: Inventory

    }
  `,
  queries: `
    
    # Requires any role. Returns a list of all Inventories in the system. <br />
    # WARNING: You probably don't want to run this.
    inventories: [Inventory]

    # Requires any role. Returns the Inventory specified by the ID.
    inventory(id: Int!): Inventory
  `,
  mutations: `
    
    # Requires admin or manager roles. Creates a new Inventory in the system.
    createInventory(input: CreateInventory!): CreateInventoryPayload

    # Requires admin or manager roles. Updates an existing Inventory in the
    # system.
    updateInventory(input: UpdateInventory!): UpdateInventoryPayload

    # Requires admin or manager roles. Deletes an existing Inventory in the
    # system.
    deleteInventory(input: DeleteInventory!): DeleteInventoryPayload
  `,
  inputs: `
    
    # Used to run the createInventory mutation.
    input CreateInventory {

      # The number of the Reward to enter into the system.
      quantity: Int!

      # The ID of the Reward that is to have Inventory added into the system.
      rewardId: Int!

    }

    # Used to run the updateInventory mutation.
    input UpdateInventory {

      # The ID of the Inventory to change.
      id: Int!

      # The information of the Inventory to change.
      patch: CreateInventory

    }

    # Used to run the deleteInventory mutation.
    input DeleteInventory {

      # The ID of the Inventory to delete.
      id: Int!

    }
  `,
};
