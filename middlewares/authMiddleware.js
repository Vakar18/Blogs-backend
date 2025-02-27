const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Token is not valid' });
  }
};

