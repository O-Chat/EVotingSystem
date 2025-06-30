const crypto = require('crypto');

module.exports = function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
};
