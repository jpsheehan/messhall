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
    rewards: {type: GraphQLInt},
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
