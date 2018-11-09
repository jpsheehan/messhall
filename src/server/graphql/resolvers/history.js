export default {
  resolvers: {
    History: {
      async reward(root, args, context) {

        try {

          const {Reward, History} = context.models;
          const history = await History.findByPk(root.id, {include: [Reward]});
          return history.reward;

        } catch (err) {

          return err;

        }

      },
      async user(root, args, context) {

        try {

          const {User, History} = context.models;
          const history = await History.findByPk(root.id, {include: [User]});
          return history.user;

        } catch (err) {

          return err;

        }

      },
    },

  },
};
