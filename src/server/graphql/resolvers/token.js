import withAuth from 'graphql-auth';
import {isSelf} from './utils';

export default {
  resolvers: {
    Token: {
      async user(root, _, context) {

        try {

          const {User, Token} = context.models;
          const token = await Token.findByPk(root.id, {include: [User]});
          return token.user;

        } catch (err) {

          return err;

        }

      },
    },
  },
  queries: {

    tokens: withAuth(['token:view:all'], (_, args, context) => {

      try {

        const {Token} = context.models;
        return Token.findAll();

      } catch (err) {

        return err;

      }

    }),

    // TODO: Add proper permissions to this.
    token: withAuth((_, args, context) => {

      try {

        const {Token} = context.models;
        return Token.findByPk(args.id);

      } catch (err) {

        return err;

      }

    }),

  },
  mutations: {
    async createToken(_, args, context) {

      const {input: {email, password}} = args;
      const {User, Token} = context.models;

      try {

        const user = await User.authenticate(email, password);
        const {authToken, token} = await Token.tokenize(user);
        return {user, token, authToken};

      } catch (err) {

        return err;

      }

    },

    async createSuperToken(_, args, context) {

      const {input: {email, password}} = args;
      const {User, Token} = context.models;

      try {

        const user = await User.authenticate(email, password);

        if (user.get('role') === 'manager' || user.get('role') === 'admin') {

          const {authToken, token} = await Token.tokenize(user);
          return {user, token, authToken};

        } else {

          throw new Error(
              'User does not have proper permissions to create a token.');

        }

      } catch (err) {

        return err;

      }

    },

    deleteToken: withAuth(async (_, args, context) => {

      return (isSelf(context, args.input.id)
          ? ['token:delete']
          : ['token:delete:self']);

    }, async (_, args, context) => {

      try {

        const {User, Token} = context.models;
        const token = await Token.findByPk(args.input.id, {include: [User]});
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
