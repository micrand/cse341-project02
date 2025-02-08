const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  // Set up header authorization
  const authHeader = req.header('Authorization');

  // Extract the token
  const token = authHeader && authHeader.split(' ')[1]; 

  // If no token, returns an error response
  if (!token) {
    return res.status(401).json({ msg: 'No token found, authorization not allowed' });
  }

  // Verify token using the secret JWT key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Proceed to the protected routes
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
