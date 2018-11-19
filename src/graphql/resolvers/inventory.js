import withAuth from 'graphql-auth';

export default {
  queries: {
    inventories: withAuth(['inventory:view:all'], (_, args, context) => {

      try {

        const {Inventory} = context.models;
        return Inventory.findAll();

      } catch (err) {

        return err;

      }

    }),

    inventory: withAuth(['inventory:view'], (_, args, context) => {

      try {

        const {Inventory} = context.models;
        return Inventory.findByPk(args.id);

      } catch (err) {

        return err;

      }

    }),
  },
  mutations: {
    createInventory: withAuth(['inventory:create'],
        async (_, args, context) => {

          try {

            const {Inventory} = context.models;
            const inventory = await Inventory.create(args.input);
            return {inventory};

          } catch (err) {

            return err;

          }

        }),

    updateInventory: withAuth(['inventory:update'],
        async (_, args, context) => {

          try {

            const {Inventory} = context.models;
            const inventory = await Inventory.findByPk(args.input.id);
            await inventory.update(args.input.patch);
            return {inventory};

          } catch (err) {

            return err;

          }

        }),

    deleteInventory: withAuth(['inventory:delete'],
        async (_, args, context) => {

          try {

            const {Inventory} = context.models;
            const inventory = await Inventory.findByPk(args.input.id);
            await inventory.destroy();
            return {inventory};

          } catch (err) {

            return err;

          }

        }),
  },
};
