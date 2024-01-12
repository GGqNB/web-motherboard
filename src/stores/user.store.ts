// Ваш файл с хранилищем useUserStore
import { defineStore } from 'pinia';

export interface UserStateInterface {
  phone: string;
  uuid: string;
}

export const useUserStore = defineStore('user', {
  persist: true,

  state: (): UserStateInterface => ({
    phone: '',
    uuid: '',
  }),

  getters: {
    getPhone: (state: UserStateInterface) => state.phone,
    getUuid: (state: UserStateInterface) => state.uuid,
    watchUuid: (state): string => {
      return state.uuid;
    },
    watchPhone: (state): string => {
      return state.phone;
    }
  },

  actions: {
    setPhone(val: string) {
      this.phone = val;
    },
    setUuid(val: string) {
      this.uuid = val;
    },
  },
});
