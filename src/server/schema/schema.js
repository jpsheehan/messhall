import {
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
const queries = require('./queries');

const ATTENDANCE_POINTS = 10;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLInt},
    role: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    points: {
      type: GraphQLInt,
      resolve(parent, args, ctx) {

        // return _.reduce(data.rewardHistory, (sum, rewardHistory) => {

        //   return sum +
        //     (rewardHistory.userId == parent.id
        //       ? (rewardHistory.type == 'attendance' ? ATTENDANCE_POINTS
        //       : -_.find(data.rewards, {id: rewardHistory.rewardId}).cost) : 0);

        // }, 0);

      },

    },
    rewardHistories: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.allRewardHistoriesByUser,
            {userId: parent.id});

      },

    },

  }),
});

const RewardHistoryType = new GraphQLObjectType({
  name: 'RewardHistory',
  fields: () => ({
    id: {type: GraphQLInt},
    date: {type: GraphQLString},
    points: {
      type: GraphQLInt,
      resolve(parent, args, {db}) {

        if (parent.type == 'attendance') {

          return ATTENDANCE_POINTS;

        } else {

          return new Promise((resolve, reject) => {

            db.queryOne(queries.singleReward, {id: parent.reward_id})
                .then((reward) => {

                  resolve(-reward.cost);

                });

          });

        }

      },
    },
    type: {type: GraphQLString},
    reward: {
      type: RewardType,
      resolve(parent, args, {db}) {

        // parent.reward_id may be null
        if (parent.reward_id) {

          return db.queryOne(queries.singleReward, {id: parent.reward_id});

        } else {

          return {};

        }

      },
    },
    user: {
      type: UserType,
      resolve(parent, args, {db}) {

        return db.queryOne(queries.singleUser, {id: parent.user_id});

      },
    },
  }),
});

const RewardType = new GraphQLObjectType({
  name: 'Reward',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    cost: {type: GraphQLInt},
    stock: {
      type: GraphQLInt,
      resolve(parent, args, ctx) {

        // return _.reduce(data.inventory, (sum, inventory) => {

        //   return sum +
        //     (inventory.rewardId == parent.id ? inventory.quantity : 0);

        // }, 0) - _.reduce(data.rewardHistory, (sum, rewardHistory) => {

        //   return sum + (rewardHistory.rewardId == parent.id ? 1 : 0);

        // }, 0);

      },
    },
    redemptions: { // redemptions
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.rewardRedemptions, {rewardId: parent.id});

      },
    },
    inventory: {
      type: new GraphQLList(InventoryType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.rewardInventory, {rewardId: parent.id});

      },
    },
  }),
});

const InventoryType = new GraphQLObjectType({
  name: 'Inventory',
  fields: () => ({
    id: {type: GraphQLInt},
    date: {type: GraphQLString},
    quantity: {type: GraphQLInt},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args, {db}) {

        return db.queryOne(queries.singleUser, {id: args.id});

      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.allUsers);

      },
    },
    rewardHistory: {
      type: RewardHistoryType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args, {db}) {

        return db.queryOne(queries.singleRewardHistory, {id: args.id});

      },
    },
    rewardHistories: {
      type: new GraphQLList(RewardHistoryType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.allRewardHistories);
        // return data.rewardHistory;

      },
    },
    reward: {
      type: RewardType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args, {db}) {

        return db.queryOne(queries.singleReward, {id: args.id});

      },
    },
    rewards: {
      type: new GraphQLList(RewardType),
      resolve(parent, args, {db}) {

        return db.queryMany(queries.allRewards);

      },

    },

  },

});

export default new GraphQLSchema({
  query: RootQuery,
});
