import axios from 'axios';
import { Locks } from 'src/declarations/responses/locks';
import { LOCKS } from 'src/backend/endpoints/locks';
import { User } from 'src/declarations/responses/user';

export type LocksData =  { data: Locks.LocksBrief[]};
//test
export default class LocksApi {

  public static async list(): Promise<LocksData> {
    const responseData: LocksData = await axios({
      ...LOCKS.LIST 
    })
      .then((r): LocksData => r);

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

  // public static async bind_lock_phone(data: User.UserBare): Promise<{ messege : string }> {
  //   const responseData: { messege : string } = await axios({
  //     ...LOCKS,
  //     data,
  //   })
  //     .then((r): { messege : string } => r.data);

  //   return responseData;
  // }

  // public static async delete(): Promise<{ messege : string }> {
  //   const responseData: { messege : string } = await axios({
  //     ...USER.DELETE,
  //   })
  //     .then((r): { messege : string } => r.data);

  //   return responseData;
  // }

  // public static async bind_locks(data: User.UserBrief): Promise<{ message: string }> {
  //   const responseData: { message: string } = await axios({
  //     ...USER.BIND_ALL_LOCK,
  //     data,
  //   })
  //     .then((r): { message: string } => r.data);

  //   return responseData;
  // }
}
