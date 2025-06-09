import axios from 'axios';
import { Locks } from 'src/declarations/responses/locks';
import { LOCKS } from 'src/backend/endpoints/locks';
import { User } from 'src/declarations/responses/user';

export type LocksList =  { items: Array<Locks.LocksBrief>, page : number, size : number};
//test
export default class LocksApi {

  public static async list(params? : any): Promise<LocksList> {
    const responseData: LocksList = await axios({
      ...LOCKS.LIST,
      params
    })
      .then((r): LocksList => r.data);

    return responseData;
  }

  public static async listNew(params? : any): Promise<LocksList> {
    const responseData: LocksList = await axios({
      ...LOCKS.LIST_NEW,
      params
    })
      .then((r): LocksList => r.data);

    return responseData;
  }

  public static async create(data: Locks.LocksBare): Promise<Locks.LocksBrief> {
    const responseData: Locks.LocksBrief = await axios({
      ...LOCKS.CREATE,
      data,
    })
      .then((r): Locks.LocksBrief => r.data);

    return responseData;
  }

  public static async update(data: Locks.LocksBare, id: number): Promise<Locks.LocksBrief> {
    const responseData: Locks.LocksBrief = await axios({
      ...LOCKS.UPDATE(id),
      data,
    })
      .then((r): Locks.LocksBrief => r.data);

    return responseData;
  }

  public static async addPhoto(data, lock_id: number): Promise<{success : boolean}> {
    const responseData: {success : boolean} = await axios({
      ...LOCKS.ADD_PHOTO(lock_id),
      data,
    })
      .then((r): { success : boolean } => r.data);

    return responseData;
  }

  public static async open(lock_id: number): Promise<{success : boolean}> {
    const responseData: {success : boolean} = await axios({
      ...LOCKS.OPEN(lock_id),
    })
      .then((r): { success : boolean } => r.data);

    return responseData;
  }

  public static async close(lock_id: number): Promise<{success : boolean}> {
    const responseData: {success : boolean} = await axios({
      ...LOCKS.CLOSE(lock_id),
    })
      .then((r): { success : boolean } => r.data);

    return responseData;
  }
}
