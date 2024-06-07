import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const url = `${API_SERVER}`;

export const PHONE = {
  LIST: {
    method: 'GET',
    url: `${url}/phones/`,
  } as IEndpointData,
  CREATE: {
    method: 'POST',
    url: `${url}/phone`,
  } as IEndpointData,
  // UPDATE(id: number): IEndpointData {
  //   return {
  //     method: 'PUT',
  //     url: `${url}/nfc_keys/${id}`,
  //   };
  // },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${url}/phone/${id}`,
    };
  },
};
