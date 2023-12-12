import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const lockTypesUrl = `${API_SERVER}/lock_types`;

export const LOCK_TYPES = {
  LIST: {
    method: 'GET',
    url: `${lockTypesUrl}/`,
  } as IEndpointData,
  SHOW (id : string): IEndpointData {
    return {
    method: 'GET',
    url: `${lockTypesUrl}/${id}/`,
    }
  },
};
