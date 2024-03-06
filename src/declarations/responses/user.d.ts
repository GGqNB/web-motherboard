export namespace User {
  export interface UserBrief {
    phone: string,
    uuid: string,
    first_name: string,
    last_name: string,
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

  export interface UserProfileBrief {
    uuid: string,
    first_name: string,
    last_name: string,
  }
}
