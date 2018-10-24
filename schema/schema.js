const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const _ = require('lodash');

const data = require('./data');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    role: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    points: {
      type: GraphQLInt,
      resolve(parent, args) {
        return _.reduce(data.rewardHistory, (sum, rewardHistory) => {
          return sum +
            (rewardHistory.userId == parent.id
              ? (rewardHistory.type == 'attendance' ? 10
              : -_.find(data.rewards, {id: rewardHistory.rewardId}).cost) : 0);
        }, 0);
      },
    },
    rewardHistories: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args) {
        return _.filter(data.rewardHistory, (reward) => {
          return reward.userId == parent.id;
        });
      },
    },
  }),
});

const RewardHistoryType = new GraphQLObjectType({
  name: 'RewardHistory',
  fields: () => ({
    id: {type: GraphQLID},
    date: {type: GraphQLString},
    points: {
      type: GraphQLInt,
      resolve(parent, args) {
        return (parent.type == 'attendance' ? 10
          : -_.find(data.rewards, {id: parent.rewardId}).cost);
      },
    },
    type: {type: GraphQLString},
    reward: {
      type: RewardType,
      resolve(parent, args) {
        return _.find(data.rewards, {id: parent.rewardId});
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(data.users, {id: parent.userId});
      },
    },
  }),
});

const RewardType = new GraphQLObjectType({
  name: 'Reward',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    cost: {type: GraphQLInt},
    stock: {
      type: GraphQLInt,
      resolve(parent, args) {
        return _.reduce(data.inventory, (sum, inventory) => {
          return sum +
            (inventory.rewardId == parent.id ? inventory.quantity : 0);
        }, 0) - _.reduce(data.rewardHistory, (sum, rewardHistory) => {
          return sum + (rewardHistory.rewardId == parent.id ? 1 : 0);
        }, 0);
      },
    },
    redemptions: { // redemptions
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args) {
        return _.filter(data.rewardHistory, (rewardHistory) => {
          return (rewardHistory.rewardId == parent.id);
        });
      },
    },
    inventory: {
      type: new GraphQLList(InventoryType),
      resolve(parent, args) {
        return _.filter(data.inventory, (inventory) => {
          return inventory.rewardId == parent.id;
        });
      },
    },
  }),
});

const InventoryType = new GraphQLObjectType({
  name: 'Inventory',
  fields: () => ({
    id: {type: GraphQLID},
    date: {type: GraphQLString},
    quantity: {type: GraphQLInt},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(data.users, {id: args.id});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return data.users;
      },
    },
    rewardHistory: {
      type: RewardHistoryType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(data.rewardHistory, {id: args.id});
      },
    },
    rewardHistories: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args) {
        return data.rewardHistory;
      },
    },
    reward: {
      type: RewardType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(data.rewards, {id: args.id});
      },
    },
    rewards: {
      type: new GraphQLList(RewardType),
      resolve(parent, args) {
        return data.rewards;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
