import history from './history';
import inventory from './inventory';
import reward from './reward';
import token from './token';
import user from './user';

const defs = [history, inventory, reward, token, user];

const queries = [];
const mutations = [];
const types = [];
const inputs = [];

defs.forEach((definition) => {

  if (definition.queries) {

    queries.push(definition.queries);

  }

  if (definition.mutations) {

    mutations.push(definition.mutations);

  }

  if (definition.types) {

    types.push(definition.types);

  }

  if (definition.inputs) {

    inputs.push(definition.inputs);

  }

});

export default `

  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    ${queries.join('\n')}
  }

  type Mutation {
    ${mutations.join('\n')}
  }

  ${types.join('\n')}

  ${inputs.join('\n')}

`;
