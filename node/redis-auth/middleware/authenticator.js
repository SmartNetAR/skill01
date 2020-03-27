const redistService = require("../service/redis.js");

exports.auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    req.session = null;
    return res.status(401).send('Unauthorized.'); // validator
    // return next();
  }

  token = token.replace("Bearer ", "");

  redistService.get( `TOKEN_${token}`, ( err, result ) => {
    
    if ( err ) {
      return res.status(500).send("Internal Server Error.");
    }

    if ( !result ) {
      req.session = null;
      return res.status(401).send('Unauthorized.'); // validator
      // return next();
    }

    try {
      req.session = JSON.parse( result );
    } catch (error) {
      return res.status(500).send("Internal Server Error.");
    }

    req.session.token = token;

    return next();

  });
  
}