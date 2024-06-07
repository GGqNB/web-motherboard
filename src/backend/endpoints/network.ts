import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const networkUrl = `${API_SERVER}/networks`;

export const NETWORK = {
  LIST: {
    method: 'GET',
    url: `${networkUrl}/`,
  } as IEndpointData,
  ACTIVE: {
    method: 'GET',
    url: `${networkUrl}/active`,
  } as IEndpointData,
  CONNECT : {
    method: 'POST',
    url: `${networkUrl}/connect/`,
  } as IEndpointData,
};
