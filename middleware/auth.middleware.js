const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  //reading the headers
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'auth-token não encontrado' });
  }
  next();
};

const requiresToken = (req, res, next) => {
  var authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(403)
      .json({ message: 'auth-token não encontrado / algo faltando' });
  }

  var decodeToken = authHeader.substring(7, authHeader.length);
  jwt.verify(
    decodeToken,
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
    },
    (err, decodedToken) => {
      if (err) {
        return res
        .status(401)
        .json({ message: 'auth-token formato inválido' });
      } else {
        //console.log('prosseguindo function');
        next();
      }
    }
  );
};

module.exports = { verifyToken, requiresToken};
