
/**
 * Returns true if the user is editing a resource that belongs to themselves.
 * @param {Object} context The GraphQL request context.
 * @param {Number} tokenId The Id of the token.
 * @return {Boolean}
 */
async function isSelf(context, tokenId) {

  try {

    const {User, Token} = context.models;
    const token = await Token.findByPk(tokenId, {include: [User]});
    return context.user.get('id') === token.user.id;

  } catch (err) {

    return false;

  }

};

export {
  isSelf,
};
