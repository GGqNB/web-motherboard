import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const addressesUrl = `${API_SERVER}/api/private/v1/addresses`;

const regionUrl = `${addressesUrl}/regions`;

export const REGION = {
  LIST: {
    method: 'GET',
    url: `${regionUrl}/`,
  } as IEndpointData,
  STORE: {
    method: 'POST',
    url: `${regionUrl}/`,
  } as IEndpointData,
  UPDATE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${regionUrl}/${id}`,
    };
  },
  RESTORE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${regionUrl}/restore/${id}`,
    };
  },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${regionUrl}/delete/${id}`,
    };
  },
};

const cityUrl = `${addressesUrl}/cities`;

export const CITY = {
  LIST: {
    method: 'GET',
    url: `${cityUrl}/`,
  } as IEndpointData,
  STORE: {
    method: 'POST',
    url: `${cityUrl}/`,
  } as IEndpointData,
  UPDATE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${cityUrl}/${id}`,
    };
  },
  RESTORE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${cityUrl}/restore/${id}`,
    };
  },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${cityUrl}/delete/${id}`,
    };
  },
  
};

const locationUrl = `${addressesUrl}/locations`;
export const LOCATION = {
  LIST: {
    method: 'GET',
    url: `${locationUrl}/`,
  } as IEndpointData,
  STORE: {
    method: 'POST',
    url: `${locationUrl}/`,
  } as IEndpointData,
  UPDATE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${locationUrl}/${id}`,
    };
  },
  RESTORE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${locationUrl}/restore/${id}`,
    };
  },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${locationUrl}/delete/${id}`,
    };
  },
};
