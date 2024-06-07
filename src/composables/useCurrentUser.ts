/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, Ref, ref } from 'vue';
import { useUserStore } from 'stores/user.store';
import { UserInfo } from 'AdminDir/declarations/access';

export function useCurrentUser() {
  const userStore = useUserStore();

  // const $currentUser = computed(() => store.getters['user/user']);

//   const accessToken = computed(() => authStore.getToken);

//   const refreshToken = computed(() => authStore.getRefreshToken);

//   const isAuthenticated = computed(() => authStore.isAuthenticated);

  const userDataSet = {
    // setToken(accessToken: string | null, refreshToken: string | null) {
    //   authStore.setToken(accessToken);
    //   authStore.setRefreshToken(refreshToken);
    // },
    setPhone(phone : string) {
      userStore.setPhone(phone);
    },
    setUuid(uuid : string) {
      userStore.setUuid(uuid);
     
    },
    getUuid() {
     return userStore.watchUuid;
    },
    getPhone() {
      return userStore.watchPhone;
     },
    logout() {
    //   userStore.clearUser();
    //   authStore.logout();
    },
  };

  return {
    // accessToken,
    // refreshToken,
    // isAuthenticated,
    userDataSet,
    // role,
    // fioFull,
    // isSimpleUser,
    // isRoot,
    // isLibrarian,
    // isCourier,
    // roleName,
  };
}
