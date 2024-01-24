export namespace User {
  export interface UserBrief {
    phone: string,
    uuid: string,
  }
  
  export interface UserData {
    username: string,
    password: string,
  }

  export interface UserBare {
    uuid: string,
  }

  export interface UserPhone {
    phone: string,
  }
}
