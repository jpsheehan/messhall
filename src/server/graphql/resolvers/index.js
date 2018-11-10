import {GraphQLDate, GraphQLTime, GraphQLDateTime} from 'graphql-iso-date';

import history from './history';
import inventory from './inventory';
import reward from './reward';
import token from './token';
import user from './user';

export default {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,

  History: history.resolvers.History,
  Reward: reward.resolvers.Reward,
  Token: token.resolvers.Token,
  User: user.resolvers.User,

  Query: {
    inventories: inventory.queries.inventories,
    inventory: inventory.queries.inventory,
    reward: reward.queries.reward,
    rewards: reward.queries.rewards,
    tokens: token.queries.tokens,
    token: token.queries.token,
    users: user.queries.users,
    user: user.queries.user,
  },
  Mutation: {
    createAttendance: history.mutations.createAttendance,
    deleteAttendance: history.mutations.deleteAttendance,
    createRedemption: history.mutations.createRedemption,
    deleteRedemption: history.mutations.deleteRedemption,
    createInventory: inventory.mutations.createInventory,
    updateInventory: inventory.mutations.updateInventory,
    deleteInventory: inventory.mutations.deleteInventory,
    createReward: reward.mutations.createReward,
    updateReward: reward.mutations.updateReward,
    deleteReward: reward.mutations.deleteReward,
    createToken: token.mutations.createToken,
    createSuperToken: token.mutations.createSuperToken,
    deleteToken: token.mutations.deleteToken,
    createUser: user.mutations.createUser,
    updateUser: user.mutations.updateUser,
    deleteUser: user.mutations.deleteUser,
  },
};
