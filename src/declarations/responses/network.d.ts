export namespace Network {
  export interface NetworkBrief {
        connected: boolean,
        ssid: string,
        signal: number,
        security: string,
  }

  export interface NetworkBare {
    ssid: string;
    password: string;

  }

}
