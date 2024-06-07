import { IEndpointData } from 'src/backend/endpoint';
import { API_SERVER } from 'src/constants/common';

const locksUrl = `${API_SERVER}/locks`;

export const LOCKS = {
  LIST: {
    method: 'GET',
    url: `${locksUrl}/?is_new=false`,
  } as IEndpointData,
  LIST_NEW: {
    method: 'GET',
    url: `${locksUrl}/?is_new=true`,
  } as IEndpointData,
  CREATE: {
    method: 'POST',
    url: `${locksUrl}/`,
  } as IEndpointData,
  SHOW(id: number): IEndpointData {
    return {
      method: 'GET',
      url: `${locksUrl}/${id}`,
    };
  },
  UPDATE(id: number): IEndpointData {
    return {
      method: 'PUT',
      url: `${locksUrl}/${id}`,
    };
  },
  DELETE(id: number): IEndpointData {
    return {
      method: 'DELETE',
      url: `${locksUrl}/${id}`,
    };
  },
  SHOW_BY_NAME(name: string): IEndpointData {
    return {
      method: 'GET',
      url: `${locksUrl}/${name}`,
    };
  },
  ADD_NFC_TO_LOCK(idLOCK:number,idNFC: number): IEndpointData {
    return {
      method: 'POST',
      url: `${locksUrl}/${idLOCK}/nfc_key/${idNFC}`,
    };
  },
  ADD_NEW_NFC_TO_LOCK(id:number): IEndpointData {
    return {
      method: 'POST',
      url: `${locksUrl}/${id}/nfc_key/`,
    };
  },
 
}