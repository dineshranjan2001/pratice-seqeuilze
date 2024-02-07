import { databaseConnectionConfig as sequelize } from "../configs/Database.config.js";
import {DataTypes } from "sequelize";
const User = sequelize.define(
  "User",
  {
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            is:/^[a-zA-Z\s]+$/,
            msg:'Please give valid firstname!!!'
        }
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            is:/^[a-zA-Z]+$/,
            msg:'Please give valid lastname!!!'
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:"Please give valid email"
        }
    },
    phonenumber:{
        type:DataTypes.STRING,
        validate:{
            is:/^[\\d]{10}$/,
            msg:"Please give valid phone number!!!"
        }
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
  },
  { tableName: "users", timestamps: true }
);

export{User}
