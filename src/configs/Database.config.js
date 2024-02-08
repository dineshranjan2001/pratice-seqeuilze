import { Sequelize } from "sequelize";

const databaseConfig={
    host:process.env.HOST,
    username:process.env.USER_NAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    dialect:process.env.DIALECT
};

const databaseConnectionConfig=new Sequelize(databaseConfig.database,databaseConfig.username,databaseConfig.password,{
    host:databaseConfig.host,
    dialect:databaseConfig.dialect
});

console.log(databaseConfig);

// database connection,authenitication and sync
(async ()=>{
    try {
       await databaseConnectionConfig.authenticate();
       console.log("Database authentication successfully");
       await databaseConnectionConfig.sync(); 
       console.log("Database synced successfully");
    } catch (error) {
        console.log("Unable to connect to database due to ",error?.message);
    }
})();

export {databaseConnectionConfig}

