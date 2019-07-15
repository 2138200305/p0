//https://github.com/narenaryan/node-jwt-integ/blob/master/middleware.js

let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, "tampaflorida", (err, decodedToken) => {
      if (err) {
        return res.json({
          success: false,
          message: 'You are not authorized for this operation'
        });
      } else {
        req.token= decodedToken;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'You are not authorized for this operation'
    });
  }
};
export default checkToken;