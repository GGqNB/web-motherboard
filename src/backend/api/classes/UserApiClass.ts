import axios from 'axios';
import { User } from 'src/declarations/responses/user';
import { USER } from 'src/backend/endpoints/user';
import { Locks } from 'src/declarations/responses/locks';
export type UserData =  { data: User.UserBrief };

export default class UserApi {

  public static async check_create(data: User.UserPhone): Promise<UserData> {
    const responseData: UserData = await axios({
      ...USER.CHECK,
      data,
    })
      .then((r): UserData => r);

    return responseData;
  }

  public static async getPhone(): Promise<User.UserBrief> {
    const responseData: User.UserBrief = await axios({
      ...USER.GET,
    })
      .then((r): User.UserBrief => r.data);

    return responseData;
  }


  public static async delete(): Promise<{ messege : string }> {
    const responseData: { messege : string } = await axios({
      ...USER.DELETE,
    })
      .then((r): { messege : string } => r.data);

    return responseData;
  }

  public static async bindLocks(data : User.UserBare): Promise<Locks.LocksBare> {
    const responseData: Locks.LocksBare = await axios({
      ...USER.BIND_ALL_LOCK,
      data,
    })
      .then((r): Locks.LocksBare => r.data);

    return responseData;
  }

  public static async bind_lock(data: User.UserBare, id : number): Promise<User.UserBrief> {
    const responseData: User.UserBrief = await axios({
      ...USER.BIND_LOCK(id),
      data,
    })
      .then((r): User.UserBrief => r.data);

    return responseData;
  }
  
}
