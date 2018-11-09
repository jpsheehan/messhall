import withAuth from 'graphql-auth';

export default {
  resolvers: {
    Reward: {
      async stock(root, args, context) {

        try {

          const {Inventory, History} = context.models;
          const inventories = await Inventory.findAll({
            where: {rewardId: root.id},
          });
          const histories = await History.findAll({
            where: {rewardId: root.id, type: 'redemption'},
          });

          const stock = inventories.reduce((sum, inventory) => {

            return sum + inventory.get('quantity');

          }, 0) - histories.length;

          return stock || 0;

        } catch (err) {

          return err;

        }

      },
      async history(root, args, context) {

        try {

          const {History} = context.models;
          const history = await History.findAll({where: {rewardId: root.id}});
          return history;

        } catch (err) {

          return err;

        }

      },
      async inventory(root, args, context) {

        try {

          const {Inventory} = context.models;
          const inventory = await Inventory.findAll({
            where: {rewardId: root.id},
          });
          return inventory;

        } catch (err) {

          return err;

        }

      },
    },
  },
  queries: {
    rewards: withAuth(['reward:view:all'], (_, args, context) => {

      try {

        const {Reward} = context.models;
        return Reward.findAll();

      } catch (err) {

        return err;

      }

    }),

    reward: withAuth((_, args, context) => {

      try {

        const {Reward} = context.models;
        return Reward.findByPk(args.id);

      } catch (err) {

        return err;

      }

    }),
  },
  mutations: {
    createReward: withAuth(['reward:create'], async (_, args, context) => {

      try {

        const {Reward} = context.models;
        const reward = await Reward.create(args.input);
        return {reward};

      } catch (err) {

        return err;

      }

    }),

    updateReward: withAuth(['reward:update'], async (_, args, context) => {

      try {

        const {Reward} = context.models;
        const reward = await Reward.findByPk(args.input.id);
        await reward.update(args.input.patch);
        return {reward};

      } catch (err) {

        return err;

      }

    }),

    deleteReward: withAuth(['reward:delete'], async (_, args, context) => {

      try {

        const {Reward} = context.models;
        const reward = await Reward.findByPk(args.input.id);
        if (reward) {

          await reward.destroy();
          return {reward};

        }

        return {reward: null};

      } catch (err) {

        return err;

      }

    }),
  },
};
