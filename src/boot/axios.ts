/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import startUp from 'src/backend/axios/start-up';
import { API_SERVER } from 'src/constants/common';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({ baseURL: API_SERVER });

export default boot(startUp);

export { api };
