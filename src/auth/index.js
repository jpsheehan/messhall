import basicAuth from 'basic-auth';
import jwt from 'jsonwebtoken';

import scopes from './scopes';

/**
 * Authenticates a request.
 * @param {express.Request} request The request instance.
 * @param {express.Response} _ The response instance.
 * @param {Function} next The next express middleware.
 */
async function auth(request, _, next) {

  const {User, Token} = request.orm;
  const authorization = request.get('Authorization');

  if (!authorization) {

    request.auth = {isAuthenticated: false, scope: null};
    return next();

  }

  if (authorization.startsWith('Basic')) {

    const {name, pass} = basicAuth(request);

    try {

      const user = await User.authenticate(name, pass);

      if (!user) {

        request.auth = {isAuthenticated: false, scope: null, user: null};
        return next();

      }

      request.auth = {
        user,
        isAuthenticated: true,
        scope: scopes[user.get('role')],
      };
      return next();

    } catch (error) {

      next(error);

    }

  } else if (authorization.startsWith('Bearer')) {

    const decoded = jwt.verify(authorization.replace(/Bearer\s+/, ''),
        process.env.JWT_SECRET);

    const token = await Token.findOne({
      where: {uuid: decoded.uuid},
      include: [User],
    });

    if (!token || token.isExpired()) {

      request.auth = {isAuthenticated: false, scope: null, user: null};
      return next();

    }

    request.auth = {
      user: token.user,
      isAuthenticated: true,
      scope: scopes[token.user.get('role')],
    };
    return next();

  } else {

    request.auth = {isAuthenticated: false, scope: null, user: null};
    return next();

  }

}

export default auth;
