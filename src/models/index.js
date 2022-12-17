'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
const custumizeConfig ={
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect: 'postgres',
  oracle:process.env.DDB_DATABASE_URL,
  logging:false,
  dialectOption:{
      ssl:{
        require:true,
        rejectUnauthorized:false
      }
    }
}

sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  custumizeConfig
  );
// const sequelize = new Sequelize('api_clean_room', 'root', "123456789", {
//   dialect: 'mysql',
//   dialectOptions: {
//     // Your mysql2 options here
//   }
// })
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;