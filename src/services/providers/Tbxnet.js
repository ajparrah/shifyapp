import axios from 'axios';

class Tbxnet {
  static getConfig() {
    return axios.create({
      baseURL: process.env.PROVIDER_TBNX_BACK_URL_V1,
      headers: {
        authorization: `Bearer ${process.env.PROVIDER_TBNX_BACK_TOKEN_V1}`,
      },
    });
  }
}

export default Tbxnet;
