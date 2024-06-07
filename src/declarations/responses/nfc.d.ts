import { Locks } from './locks'

export namespace Nfc {
  export interface NfcBrief {
      key: string,
      is_master: false,
      phone_id: number,
      id: number,
      locks: Locks.LockInNfc
      phone: null | {
        phone: string
      }
  }

  export interface NfcBare {
    key: string,
    is_master: boolean,
    phone_id: number,
  }

  export interface NfcAnyBare {
    key_list: Array<string>,
  }
}
