import axios from 'axios';
import { Network } from 'src/declarations/responses/network';
import { NETWORK } from 'src/backend/endpoints/network';

export type NetworkData =  { data: Network.NetworkBare[] };
// export type UserActionResponse = {
//   data: Users.UserResponseInfo;
//   message: string;
// }

export default class NetworkApi {
  public static async list(): Promise<NetworkData> {
    const responseData: NetworkData = await axios({
      ...NETWORK.LIST
    })
      .then((r): NetworkData => r.data);

    return responseData;
  }
  // public static async show(id: number): Promise<Users.UserDefault> {
  //   const responseData: Users.UserDefault = await axios({
  //     ...USER.SHOW(id),
  //   })
  //     .then((r): Users.UserDefault => r.data.data);

  //   return responseData;
  // }
}
