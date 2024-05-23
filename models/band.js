'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MeetGreet, SetTime }) {
      // meet and greets
      Band.hasMany(MeetGreet, {
        foreignKey: 'band_id',
        as: 'meet_greets'
      })

      // set times
      Band.hasMany(SetTime, {
        foreignKey: 'band_id',
        as: 'set_times'
      })
    }
  }
  Band.init({
    band_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'band',
    timestamps: false
  });
  return Band;
};