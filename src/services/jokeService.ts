import axios from 'axios';

interface DataValues {
  id: number;
  joke: string;
  category: string[];
}

interface ServerData {
  type: string;
  value: DataValues;
}

class JokeService {
  sendRequest = async (): Promise<string> => {
    try {
      const response = await axios.get<ServerData>(
        'http://api.icndb.com/jokes/random',
      );

      return response.data.value.joke;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default new JokeService();
