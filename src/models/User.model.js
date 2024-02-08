import { databaseConnectionConfig as sequelize } from "../configs/Database.config.js";
import {DataTypes } from "sequelize";
import { Address } from "./Address.model.js";
const User = sequelize.define(
  "User",
  {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
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
        allowNull:false,
        validate:{
            is:/^[\\d]{10}$/,
            msg:"Please give valid phone number!!!"
        }
    },
    avatar:{
        type:DataTypes.STRING
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
  },
  { tableName: "users", timestamps: true }
);

User.hasMany(Address);
Address.belongsTo(User);

export{User}
