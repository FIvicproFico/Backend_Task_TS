import axios from 'axios';

import env from '../config/env-config';
import emailService from './emailService';

interface IDataValues {
  id: number;
  joke: string;
  category: string[];
}

interface IServerData {
  type: string;
  value: IDataValues;
}

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

class JokeService {
  sendRequest = async (): Promise<string> => {
    try {
      const response = await axios.get<IServerData>(
        'http://api.icndb.com/jokes/random',
      );
      if (response.data) return response.data.value.joke;
      throw new Error('Error with API service');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  sendNamedRequest = async (
    name: string,
    surname: string,
    email: string,
  ): Promise<string> => {
    const parsedName = name
      .replace(/[š]/g, 's')
      .replace(/[đ]/g, 'd')
      .replace(/[ć]/g, 'c')
      .replace(/[č]/g, 'c')
      .replace(/[ž]/g, 'z')
      .replace(/[^a-zA-Z ]/g, '');

    const parsedSurname = surname
      .replace(/[š]/g, 's')
      .replace(/[đ]/g, 'd')
      .replace(/[ć]/g, 'c')
      .replace(/[č]/g, 'c')
      .replace(/[ž]/g, 'z')
      .replace(/[^a-zA-Z ]/g, '');

    try {
      const response = await axios.get<IServerData>(
        'http://api.icndb.com/jokes/random',
        { params: { firstName: parsedName, lastName: parsedSurname } },
      );
      const mailOptions: IMailOptions = {
        from: env.mailAdress,
        to: email,
        subject: env.subject,
        text: response.data.value.joke,
      };
      emailService.sendEmail(mailOptions);
      if (response.data) return response.data.value.joke;
      throw new Error('Error with API service');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default new JokeService();
