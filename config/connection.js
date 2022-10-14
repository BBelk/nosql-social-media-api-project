const { connect, connection } = require('mongoose');

connect('mongodb://localhost/challengeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
