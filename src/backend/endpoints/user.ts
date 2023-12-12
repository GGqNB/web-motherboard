import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const userUrl = `${API_SERVER}/user`;


export const USER = {
  CREATE: {
    method: 'POST',
    url: `${userUrl}/`,
  } as IEndpointData,
  CHECK: {
    method: 'POST',
    url: `${userUrl}/`,
  } as IEndpointData,
  BIND_LOCK(id: number): IEndpointData {
    return {
      method: 'POST',
      url: `${userUrl}/bind/locks/${id}`,
    };
  },
  BIND_ALL_LOCK(): IEndpointData {
    return {
      method: 'POST',
      url: `${userUrl}/bind/locks/`,
    };
  },
  DELETE(): IEndpointData {
    return {
      method: 'DELETE',
      url: `${userUrl}/`,
    };
  },
};


