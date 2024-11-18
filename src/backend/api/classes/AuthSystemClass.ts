import axios from 'axios';
import { User } from 'src/declarations/responses/user';
import { AUTH } from 'src/backend/endpoints/auth';


export default class AuthSystemApi {

  public static async login(data): Promise<User.UserToken> {
    const responseData: User.UserToken = await axios({
      ...AUTH.LOGIN,
      data,
    })
      .then((r): User.UserToken => r.data);

    return responseData;
  }

  public static async me(): Promise<string> {
    const responseData: string = await axios({
      ...AUTH.ME,
    })
      .then((r): string => r.data);

    return responseData;
  }
  

}
