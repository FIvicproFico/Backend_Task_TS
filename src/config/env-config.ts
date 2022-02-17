import dotenv from 'dotenv';

import { Dialect } from 'sequelize/dist';

dotenv.config();

interface IEnv {
  accessTokenSecret: string;
  refreshTokenSecret: string;

  dbName: string;
  dbDialect: Dialect;
  dbUsername: string;
  dbPassword: string;
  dbHostname: string;
  dbPort: string;

  mailService: string;
  mailAdress: string;
  appSpecificPassword: string;
}

const env: IEnv = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  dbName: process.env.DB_NAME,

  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: 'mysql',
  dbHostname: process.env.DB_HOSTNAME,
  dbPort: process.env.DB_PORT,

  mailService: process.env.MAIL_SERVICE,
  mailAdress: process.env.MAIL_ADRESS,
  appSpecificPassword: process.env.APPLICATION_SPECIFIC_PASSWORD,
};

export default env;
