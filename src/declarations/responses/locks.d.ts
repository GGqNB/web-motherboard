export namespace Locks {
  export interface LocksBrief {
      name: string,
      address: string,
      sub_address: number | string,
      id: number,
      nfc_keys?: Array<NFCkeyBrief>,
      lock_type?: LocksTypeBrief,
  }

  export interface LocksBare {
    name: string
    address: string,
    sub_address: number,
    lock_type_id: number

  }

  //возможно bare
  export interface LocksTypeBrief {
    name: string,
    id: number,

  }
  export interface NFCkeyBrief {
    key: string,
    id: number,

  }

}
