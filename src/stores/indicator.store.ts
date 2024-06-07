// Ваш файл с хранилищем useUserStore
import { defineStore } from 'pinia';

export interface IndicatorStateInterface {
  activeWifi: boolean;
  activePhone: boolean
}

export const useIndicatorStore = defineStore('indicator', {
  persist: true,

  state: (): IndicatorStateInterface => ({
    activeWifi: false,
    activePhone: false,
  }),

  getters: {
    getActiveWifi: (state: IndicatorStateInterface) => state.activeWifi,
    getActivePhone: (state: IndicatorStateInterface) => state.activePhone,
    watchActiveWifi: (state): boolean => {
      return state.activeWifi;
    },
    watchActivePhone: (state): boolean => {
      return state.activePhone;
    }
  },

  actions: {
    setActivePhone(val : boolean) {
      this.activePhone = val;
    },
    setActiveWifi(val : boolean) {
      this.activeWifi = val;
    },
  }, 
});
