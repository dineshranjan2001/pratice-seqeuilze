import { databaseConnectionConfig as sequelize } from "../configs/Database.config.js";
import { DataTypes } from "sequelize";

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinnumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\\d]{6}$/,
        msg: "Please give valid pin number",
      },
    },
    locality: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "address", timestamps: false }
);


export {Address}