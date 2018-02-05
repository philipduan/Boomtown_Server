const mongoose = require('mongoose');
const seedDB = require('./seed');
//Steal the promises from the node environmnent
mongoose.Promise = global.Promise;

//If there is an environment variable MONGODB_URI connect to that or connect to localhost
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/boomtown'
);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

mongoose.connection.once('open', function() {
  console.log('Connected to DB');
  //seedDB();
});

module.exports = {
  mongoose
};
