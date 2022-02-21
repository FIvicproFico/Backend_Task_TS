import { Sequelize } from 'sequelize-typescript';

import env from './env-config';
import models from '../models';

export const sequelize = new Sequelize({
  database: env.dbName,
  dialect: env.dbDialect,
  username: env.dbUsername,
  password: env.dbPassword,
});

export const sequelizeConfig = () => {
  sequelize.addModels(models);
};
