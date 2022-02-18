import bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';

import { Users } from '../models';

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
  createdAt: Date;
  updatedAt: Date;
}

class UserService {
  // : Promise<Array<IUser>>
  getUsers = async (): Promise<IUser[] | null> => {
    try {
      const users = await Users.findAll({ raw: true });
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // getUsers = (): Promise<IUser[] | null> => {
  //   return Users.findAll({ raw: true });
  // };

  getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
        raw: true,
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserByID = async (id: number): Promise<IUser | void> => {
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
      const user = await this.getUserByID(id);
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
      const user = await this.getUserByID(id);
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
}

export default new UserService();
