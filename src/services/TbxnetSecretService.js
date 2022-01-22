import Providers from './providers/Providers.js';

class TbxnetSecretService {
  static async getListOfFiles() {
    try {
      const url = `/secret/files`;
      const response = await Providers.tbxnet.get(url);

      if (response.data) {
        const { files } = response.data;
        return files;
      }
      return [];
    } catch (error) {
      throw new Error(
        'An error occurred when we tried to get the list of files'
      );
    }
  }
}

export default TbxnetSecretService;
