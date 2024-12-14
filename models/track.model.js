let { DataTypes, sequelize } = require('../lib/index2.js');

let track = sequelize.define('track', {
  name: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  hero: DataTypes.TEXT,
});

module.exports = { track };
