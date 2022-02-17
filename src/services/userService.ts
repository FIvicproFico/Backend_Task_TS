import { Users } from '../models';

class UserService {
  getUsers = async () => {
    try {
      const users = await Users.findAll({ raw: true });
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default new UserService();
