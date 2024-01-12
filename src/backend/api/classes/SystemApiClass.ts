import axios from 'axios';
import { SYSTEM } from 'src/backend/endpoints/system';

//test
export default class SystemApi {

  public static async get(): Promise<{message: string}> {
    const responseData: {message: string} = await axios({
      ...SYSTEM.GET 
    })
      .then((r): { message: string } => r.data);

    return responseData;
  }

}