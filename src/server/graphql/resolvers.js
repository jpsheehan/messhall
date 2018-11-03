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
};
