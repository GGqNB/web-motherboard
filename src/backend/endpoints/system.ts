import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const systemUrl = `${API_SERVER}/system`;

export const SYSTEM = {
  GET: {
    method: 'GET',
    url: `${systemUrl}/restart/websocket/`,
  } as IEndpointData,
};
