const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');

const auth = {
  role: (role) => {
    return async (req, res, next) => {
      const token = req?.headers?.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }

      try {
        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) {
          return res.status(401).json({ msg: 'Token has been logged out' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        if (req.user.role === 'admin' || !role || req.user.role === role) {
          return next();
        }

        return res.status(403).json({ msg: 'Access denied' });
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
    };
  },
};

auth.user = () => auth.role('user');
auth.admin = () => auth.role('admin');

module.exports = auth;
