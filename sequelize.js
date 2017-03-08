var Sequelize = require('sequelize');
var Promise = require('bluebird');

var poolCfg = require('./connection.json');
var env = process.env;

var db = env.CLEARDB_DB_NAME || poolCfg.database;
var username = env.CLEARDB_USERNAME || poolCfg.user;
var pass = env.CLEARDB_PASSWORD || poolCfg.password;
var host = env.CLEARDB_HOST || poolCfg.host;

var sequelize = new Sequelize(db, username, pass, {
  host: host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  timestamps: true,
  freezeTableName: true
});

/**** DELETE ME ON THE MAIN BRANCH, MAYBE, LATER, MAYBE ***/
var LogEntry = sequelize.define('LogEntry', {
   message: {
      type: Sequelize.STRING
   },
   botId: {
      type: Sequelize.STRING
   },
}, {
   freezeTableName: true
});

sequelize.sync().then(function() {
})
.catch(function(err) {
   console.error("EXTREMELY UNLIKELY ERROR DETECTED " + JSON.stringify(err.message), err.stack);
});

module.exports = {
   LogEntry: LogEntry,
   do: sequelize
};
