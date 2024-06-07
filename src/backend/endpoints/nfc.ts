import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const url = `${API_SERVER}`;

export const NFC = {
  LIST: {
    method: 'GET',
    url: `${url}/nfc_keys/`,
  } as IEndpointData,
  CREATE: {
    method: 'POST',
    url: `${url}/nfc_key`,
  } as IEndpointData,
  UPDATE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${url}/nfc_keys/${id}`,
    };
  },
  SHOW(id: number): IEndpointData {
    return {
      method: 'GET',
      url: `${url}/nfc_keys/${id}`,
    };
  },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${url}/nfc_keys/${id}`,
    };
  },
  UPLOAD: {
    method: 'POST',
    url: `${url}/upload_from_file`,
  } as IEndpointData,
};
