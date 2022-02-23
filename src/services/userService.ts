import bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

import { Users, Address } from '../models';
import { sequelize } from '../config/seq-config';

const saltRounds = 10;

interface IUser {
  id: number;
  uuid: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IAddress {
  id: number;
  streetAdress: string;
  streetNumber: number;
  zipCode: number;
  town: string;
  country: string;
}

class UserService {
  // : Promise<Array<IUser>>

  // getUsers = (): Promise<IUser[] | null> => {
  //   return Users.findAll({ raw: true });
  // };
  getUsers = async (): Promise<IUser[]> => {
    try {
      const users = await Users.findAll({ raw: true });
      if (users) return users;
      throw new Error('No Users');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Faster than getUsers
  getUsersQuery = async (): Promise<IUser[]> => {
    try {
      const users = await sequelize.query(
        'SELECT `id`, `uuid`, `username`, `password`, `name`, `surname`, `email`, `role` FROM `Users` AS `Users`;',
        {
          model: Users,
          mapToModel: true,
          raw: true,
        },
      );
      if (users) return users;
      throw new Error('No Users');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
        raw: true,
      });
      if (user) return user;
      throw new Error('No User');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserById = async (id: number): Promise<IUser | null> => {
    try {
      const user = await Users.findOne({
        where: {
          id,
        },
        raw: true,
      });
      if (user) return user;
      throw new Error('No User');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  AddNewUser = async (
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    role: string,
  ): Promise<void> => {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      await Users.findOrCreate({
        where: {
          username,
          email,
        },
        defaults: {
          uuid: uuidv4(),
          password: hash,
          name,
          surname,
          role,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateUsername = async (id: number, username: string): Promise<void> => {
    try {
      const user = await this.getUserById(id);
      if (user)
        await Users.update(
          {
            username,
          },
          {
            where: {
              id,
            },
          },
        );
    } catch (error) {
      console.error(error); // Handles error for .getUserByID() but not for Users.update() promise
      throw error;
    }
  };

  deleteUser = async (id: number): Promise<void> => {
    try {
      const user = await this.getUserById(id);
      if (user)
        await Users.destroy({
          where: {
            id: user.id,
          },
        });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserAddress = async (addressId: number): Promise<IAddress> => {
    try {
      const address = await Address.findOne({
        where: {
          addressId,
        },
        raw: true,
      });
      if (address) return address;
      throw new Error('No Address');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserAddressQuery = async (addressId: number): Promise<IAddress> => {
    try {
      const address = await sequelize.query(
        `SELECT * FROM Address WHERE Address.id = ${addressId};`,
        {
          model: Address,
          mapToModel: true,
          raw: true,
        },
      );
      if (address) return address[0];
      throw new Error('No Address');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default new UserService();
