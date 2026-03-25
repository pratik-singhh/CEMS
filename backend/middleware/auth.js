const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function authMiddleware(req, res, next) {
  let token;
  if (!req.headers.authorization) return res.status(401).json({
    message: 'Unauthorized',
  });
  if (req.headers.authorization.startsWith('Bearer ')) {
    const [_, temp] = req.headers.authorization.split(' ');
    token = temp;
  }
  else {
    token = req.headers.authorization;
  }

  if (!token) return res.status(401).json({
    message: 'Unauthorized',
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
