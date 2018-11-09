import withAuth from 'graphql-auth';

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
  mutations: {

    createAttendance: withAuth(['attendance:create:self'],
        (_, args, context) => {

          try {

            const {History} = context.models;

            const props = {
              date: args.input.date,
              userId: context.user.get('id'),
              points: 10,
              type: 'attendance',
            };

            const history = History.create(props);
            return {history};

          } catch (err) {

            return err;

          }

        }),

    deleteAttendance: withAuth(['attendance:delete'],
        async (_, args, context) => {

          try {

            const {History} = context.models;
            const history = await History.findByPk(args.input.id);

            if (history) {

              await history.destroy();
              return {history};

            }

            return null;

          } catch (err) {

            return err;

          }

        }),

    createRedemption: withAuth(['redemption:create:self'],
        async (_, args, context) => {

          try {

            const {History, Reward} = context.models;
            const cost = (await Reward.findByPk(args.input.rewardId))
                .get('cost');

            const histories = await History.findAll({
              where: {userId: context.user.get('id')},
            });
            const balance = histories.reduce((sum, history) => {

              return sum + history.get('points');

            }, 0);

            if (cost <= balance) {

              const props = {
                userId: context.user.get('id'),
                rewardId: args.input.rewardId,
                points: -cost,
                type: 'redemption',
              };

              const history = await History.create(props);
              return {history};

            } else {

              throw new Error('Insufficient Balance!');

            }

          } catch (err) {

            return err;

          }

        }),

    deleteRedemption: withAuth(['redemption:delete'],
        async (_, args, context) => {

          try {

            const {History} = context.models;
            const history = await History.findByPk(args.input.id);

            if (history) {

              await history.destroy();
              return {history};

            }

            return null;

          } catch (err) {

            return err;

          }

        }),

  },
};
