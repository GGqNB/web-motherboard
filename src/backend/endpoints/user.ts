import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const userUrl = `${API_SERVER}/user`;


export const USER = {
  GET: {
    method: 'GET',
    url: `${userUrl}/`,
  } as IEndpointData,
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
    BIND_ALL_LOCK: {
    method: 'POST',
    url: `${userUrl}/bind/locks/`,
  } as IEndpointData,

  DELETE(): IEndpointData {
    return {
      method: 'DELETE',
      url: `${userUrl}/`,
    };
  },
};


