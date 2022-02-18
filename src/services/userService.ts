import { Users } from '../models';

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
  getUsers = async (): Promise<IUser[]> => {
    try {
      const users = await Users.findAll({ raw: true });
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserByEmail = async (email: string): Promise<IUser> => {
    try {
      const user = await Users.findAll({
        where: {
          email,
        },
        raw: true,
      });
      return user[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserByID = async (id: number): Promise<IUser> => {
    try {
      const user = await Users.findAll({
        where: {
          id,
        },
        raw: true,
      });
      return user[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default new UserService();
