import Providers from './providers/Providers.js';
import * as csvParse from 'csv-parse/sync';
import { Logger } from '../config/logger.js';

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

  static async getFileContent(fileName) {
    if (!fileName) return;

    try {
      const url = `/secret/file/${fileName}`;
      const response = await Providers.tbxnet.get(url, {
        responseType: 'text',
        validateStatus: (status) => status < 500,
      });
      if (response.status !== 200) return; // Skip file because it could not be downloaded

      const csvParsed = csvParse.parse(response.data, {
        columns: ['file', 'text', 'number', 'hex'],
        from_line: 2,
        group_columns_by_name: true,
        trim: true,
        skip_empty_lines: true,
        skip_records_with_empty_values: true,
        skip_records_with_error: true,
      });
      const fileContent = csvParsed.map((file) => ({
        text: file.text,
        number: file.number,
        hex: file.hex,
      }));
      return fileContent;
    } catch (error) {
      const defaultMessage = `An error occurred when we tried to get content of file called ${fileName}`;
      if (error.response) {
        // We need to know if something went wrong with our provider
        Logger.error({
          msg: defaultMessage,
        });
        if (error.response.data) {
          Logger.error({
            msg: `DETAILS: Error got from tbxnet provider`,
            details: error.response.data,
          });
        }
      } else {
        throw new Error(defaultMessage);
      }
    }
  }
}

export default TbxnetSecretService;
