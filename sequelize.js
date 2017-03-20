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

var LogEntry = sequelize.define('LogEntry', {
   score: {
      type: Sequelize.INTEGER,
      default: -1
   },
   chromosome: {
      type: Sequelize.STRING
   },
   generation: {
      type: Sequelize.INTEGER
   },
   botId: {
      type: Sequelize.STRING,
      default: ""
   },
}, {
   freezeTableName: true
});

sequelize.sync().then(function() {
   return LogEntry.findAll();
})
.then(function(entries) {
   // No entries! Let's seed the population
   population = [];
   if (entries.length === 0) {
      // Generate 200 random 55-bit strings of 0s or 1s.
      for (var i = 0; i < 200; i++) {
         chromosome = '';
         for (var j = 0; j < 55; j++) {
            num = Math.floor(Math.random()*(1-0+1)+0);
            chromosome += num.toString();
         }
         population.push({chromosome: chromosome, generation: 0, score: -1});
      }
   }
   return LogEntry.bulkCreate(population);
})
.catch(function(err) {
   console.error("EXTREMELY UNLIKELY ERROR DETECTED " + JSON.stringify(err.message), err.stack);
});

module.exports = {
   LogEntry: LogEntry,
   do: sequelize
};
