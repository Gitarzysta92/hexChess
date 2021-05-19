import { registerAs } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

export interface MysqlDatabaseConfig {
  dialect: string
  host: string
  port: number
  username: string
  password: string
  database: string
  autoLoadModels?: boolean
  synchronize?: boolean
  logging?: boolean
  define?: any
};


export const MYSQL_DATABASE_CONFIG = 'database-config';
export const databaseConfig = registerAs(MYSQL_DATABASE_CONFIG, () => {
  const config: MysqlDatabaseConfig = {
    dialect: process.env.MYSQL_DATABASE_DIALECT,
    host: process.env.MYSQL_DATABASE_HOST,
    port: parseInt(process.env.MYSQL_DATABASE_PORT),
    database: process.env.MYSQL_DATABASE_NAME,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    autoLoadModels: true,
    logging: false,
    //synchronize: true,
    define: {
      timestamps: false,
    },
  }
  return config;
});