import withAuth from 'graphql-auth';

export default {
  resolvers: {
    User: {
      async tokens(root, _, context) {

        try {

          const {User} = context.models;
          const user = await User.findByPk(root.id, {include: ['tokens']});
          return user.tokens;

        } catch (err) {

          return err;

        }

      },
      async history(root, args, context) {

        try {

          const {History} = context.models;
          const histories = await History.findAll({where: {userId: root.id}});
          return histories;

        } catch (err) {

          return err;

        }

      },
      async points(root, args, context) {

        try {

          const {History} = context.models;
          const histories = await History.findAll({where: {userId: root.id}});
          const points = histories.reduce((sum, history) => {

            return sum + history.get('points');

          }, 0);
          return points;

        } catch (err) {

          return err;

        }

      },
    },
  },

  queries: {

    users: withAuth(['user:view:all'], async (_, args, context) => {

      try {

        const {User} = context.models;
        return User.findAll();

      } catch (err) {

        return err;

      }

    }),

    user: withAuth((_, args, context) => {

      return context.user.get('id') !== args.id
        ? ['user:view']
        : ['user:view:self'];

    }, async (_, args, context) => {

      try {

        const {User} = context.models;
        const user = await User.findByPk(args.id);
        return user;

      } catch (err) {

        return err;

      }

    }),

  },
  mutations: {

    createUser: withAuth(['user:create'], async (_, args, context) => {

      try {

        const {User} = context.models;
        const user = await User.create(args.input);
        return {user};

      } catch (err) {

        return err;

      }

    }),

    updateUser: withAuth((_, args, context) => {

      return context.user.get('id') !== args.id
          ? ['user:update']
          : ['user:update:self'];

    }, async (_, args, context) => {

      try {

        const {User} = context.models;
        const user = await User.findByPk(args.input.id);
        await user.update(args.input.patch);
        return {user};

      } catch (err) {

        return err;

      }

    }),

    deleteUser: withAuth((_, args, context) => {

      return context.user.get('id') !== args.id
          ? ['user:delete']
          : ['user:delete:self'];

    }, async (_, args, context) => {

      try {

        const {User} = context.models;
        const user = await User.findByPk(args.input.id);
        await user.destroy();
        return {user};

      } catch (err) {

        return err;

      }

    }),
  },
};
