import withAuth from 'graphql-auth';

export default {
  User: {
    async tokens(root, _, context) {

      try {

        const {User} = context.models;
        const user = await User.findById(root.id, {include: ['tokens']});
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
  Token: {
    async user(root, _, context) {

      try {

        const {User, Token} = context.models;
        const token = await Token.findById(root.id, {include: [User]});
        return token.user;

      } catch (err) {

        return err;

      }

    },
  },
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
        const inventory = await Inventory.findAll({where: {rewardId: root.id}});
        return inventory;

      } catch (err) {

        return err;

      }

    },
  },
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
  Query: {
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

    }),

    tokens: withAuth((_, args, context) => {

      try {

        const {Token} = context.models;
        return Token.findAll();

      } catch (err) {

        return err;

      }

    }),

    token: withAuth((_, args, context) => {

      try {

        const {Token} = context.models;
        return Token.findById(args.id);

      } catch (err) {

        return err;

      }

    }),

    rewards: withAuth((_, args, context) => {

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
        return Reward.findById(args.id);

      } catch (err) {

        return err;

      }

    }),
  },
  Mutation: {
    async logIn(_, args, context) {

      const {input: {email, password}} = args;
      const {User, Token} = context.models;

      try {

        const user = await User.authenticate(email, password);
        const token = await Token.tokenize(user);
        return {user, token};

      } catch (err) {

        return err;

      }

    },

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
        const user = await User.findById(args.input.id);
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
        const user = await User.findById(args.input.id);
        await user.destroy();
        return {user};

      } catch (err) {

        return err;

      }

    }),

    deleteToken: withAuth((_, args, context) => {

      return context.user.get('id') !== args.id
          ? ['token:delete']
          : ['token:delete:self'];

    }, async (_, args, context) => {

      try {

        const {User, Token} = context.models;
        const token = await Token.findById(args.input.id, {include: [User]});
        if (token) {

          await token.destroy();
          return {user: token.user};

        }

        return null;

      } catch (err) {

        return err;

      }

    }),
  },
};
