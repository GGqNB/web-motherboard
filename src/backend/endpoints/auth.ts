import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const authUrl = `${API_SERVER}`;


export const AUTH = {
  // GET: {
  //   method: 'GET',
  //   url: `${authUrl}/`,
  // } as IEndpointData,
  ME: {
    method: 'GET',
    url: `${authUrl}/test-token`,
  } as IEndpointData,
  // CREATE: {
  //   method: 'POST',
  //   url: `${authUrl}/`,
  // } as IEndpointData,
  LOGIN: {
    method: 'POST',
    url: `${authUrl}/login`,
  } as IEndpointData,
};


