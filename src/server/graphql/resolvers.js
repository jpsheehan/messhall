import withAuth from 'graphql-auth';

/**
 * The error to throw when an endpoint is not found
 */
class NotFoundError extends Error {

  /**
   * Creates a new instance of NotFoundError
   * @param {String} message The message to be shown with the error.
   */
  constructor(message = 'Not Found') {

    super(message);
    this.message = message;
    this.name = 'NotFoundError';

  }

}

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

        const {Reward} = context.models;
        const reward = await Reward.findById(root.id);
        return reward;

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

      const {input: {name, password}} = args;
      const {User, Token} = context.models;

      try {

        const user = await User.authenticate(name, password);
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
        if (!token) {

          await token.destroy();

        }
        return {token};

      } catch (err) {

        return err;

      }

    }),
  },
};
