let { DataTypes, sequelize } = require('../lib/index2.js');
let { user } = require('./user.model.js');
let { track } = require('./track.model.js');

let like = sequelize.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'id',
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      key: 'id',
    },
  },
});

user.belongsToMany(track, { through: like });
track.belongsToMany(user, { through: like });
module.exports = { like };
