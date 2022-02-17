import { Sequelize } from 'sequelize-typescript';

import env from './env-config';

import { Tests } from '../models';

export const sequelizeConfig = () => {
  const sequelize = new Sequelize({
    database: env.dbName,
    dialect: env.dbDialect,
    username: env.dbUsername,
    password: env.dbPassword,
  });

  sequelize.addModels([Tests]);
};
