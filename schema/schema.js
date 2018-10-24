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
        return _.reduce(data.rewards, (sum, reward) => {
          return sum + (reward.userId == parent.id ? reward.points : 0);
        }, 0);
      },
    },
    rewards: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args) {
        return _.filter(data.rewards, (reward) => {
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
    points: {type: GraphQLInt},
    notes: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(data.users, {id: parent.userId});
      },
    },
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
    reward: {
      type: RewardHistoryType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(data.rewards, {id: args.id});
      },
    },
    rewards: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args) {
        return data.rewards;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
