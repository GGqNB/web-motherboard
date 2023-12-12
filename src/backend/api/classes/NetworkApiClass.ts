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
      .then((r): NetworkData => r);

    return responseData;
  }

  public static async connect(data: Network.NetworkBare): Promise<{ message: string }> {
    const responseData: { message: string } = await axios({
      ...NETWORK.CONNECT,
      data,
    })
      .then((r): { message: string } => r.data);

    return responseData;
  }
}
