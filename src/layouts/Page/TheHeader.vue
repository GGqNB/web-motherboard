<template>
  <q-header id="" reveal class="bg-grey-10">
    <q-toolbar class="s-header--toolbar">
      <div class="row items-center s-header">
        <q-btn class="s-header-menu" clickable flat no-wrap dense @click="changeVisibilitySidebar">
          <q-icon name="menu" />
        </q-btn>
        <router-link :to="{ name: routerMainPageName }">
          <!-- TODO: Лого нужно, лого нет -->
          <img class="s-header-logo q-ml-xl" src="icons/logo.png" alt="Логотип системы">
        </router-link>
      </div>
      
      <q-space /> 
      <div class="flex justify-end mt-base-10">
          <q-btn dense flat round icon="lens" size="12.5px" :color="(wifi_flag ? 'green' : 'red')"> 
          <q-tooltip
          
          anchor="center right"
            self="center middle"
          :offset="[-200, 200]"
          :delay="400"
        >
        <div v-if="!wifi_flag">Красный цвет - нет соединения</div>
        <!-- <div>Ораньжевый цвет - нет соединения с сервером</div> -->
        <div v-if="wifi_flag">Зеленый цвет - есть соединение </div>
        </q-tooltip>
          </q-btn>
          <q-btn dense flat round icon="lens" size="12.5px" :color="(phone_flag ? 'green' : 'red')"><q-tooltip
          
            anchor="center right"
            self="center middle"
          :offset="[-300, 0]"
          :delay="400"
        >
        <!-- <div>Красный цвет - ошибка сервера</div>
        <div>Ораньжевый цвет - Требуется регистрация на<br> сайте stown.ooo с указанным н.т</div> -->
        <div v-if="phone !== null">Привязанный номер телефона {{ phone }}</div>
        <div v-if="phone == null">Красный цвет - ошибка сервера</div>
        </q-tooltip></q-btn>
        </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useAppStore } from 'stores/app.store';
import { useIndicatorStore } from 'stores/indicator.store';
import {  defineComponent, onMounted, ref, watch} from 'vue';
import { storeToRefs } from 'pinia';
import { routerMainPageName, loginPageName } from 'src/router/router.constants';
import { useRouter } from 'vue-router';
import { useIndicator } from 'src/composables/useIndicator';
import { useCurrentUser } from 'src/composables/useCurrentUser'; 
import { makeRequest } from 'src/composables/useRequest';
import NetworkApi from 'src/backend/api/classes/NetworkApiClass';
import { Network } from 'src/declarations/responses/network';
import { useLoading } from 'src/composables/useLoading';
import UserApi from 'src/backend/api/classes/UserApiClass';
// import { HeaderProfileLink } from 'SharedComponents/header/profile.d';
// import { useLocalAuthStore } from 'AdminDir/stores/auth.store';
// import { useUserStore } from 'AdminDir/stores/user.store';
// import HeaderOrganization from 'src/components/header/HeaderOrganization.vue';
// import HeaderProfile from 'SharedComponents/header/Profile.vue';

export default defineComponent({
  name: 'TheHeader',
  components: {
  },
  setup() {
    const router = useRouter();
    const $currentUser = useCurrentUser();
    const appStore = useAppStore();
    const indicatorStore = useIndicatorStore();
    // const authStore = useLocalAuthStore();
    // const userStore = useUserStore();
    const phone = ref('');
    const getUser = async () => {
      try{
        const response = await makeRequest(async () =>
        UserApi.me()); 
        if (response) {
          phone_flag.value = true;
          phone.value = response.first_name + ' ' + response.last_name;
          $indicator.indicatorDataSet.setActivePhone(true);
        }
      }catch{
        phone_flag.value = false;
        $indicator.indicatorDataSet.setActivePhone(false);

      }
    }
    const activeWifi = ref<Network.NetworkBrief[]>([])
    const { collapseSidebar } = storeToRefs(appStore);
    const changeVisibilitySidebar = () => {
      appStore.setCollapseSidebar(!collapseSidebar.value);
    };
    const listWifi = ref<Network.NetworkBrief[]>([]);
      const checkWifi = async () => {
        const response = await makeRequest(async () => NetworkApi.active());
         if (response.length  !== 0 ) {
           return true
         }else{
          return false
         }
    }
    
    const wifi_flag = ref(false);
    const phone_flag = ref(false);
    const $indicator = useIndicator();
    const watchIndicator = () => {
      checkWifi().then(result => {
        wifi_flag.value = result; 
      });
      phone_flag.value = $indicator.indicatorDataSet.getActivePhone();
    }
    onMounted(
      () => watchIndicator()
    ),
    onMounted(
      () => getUser()
    ),
    watch(() => indicatorStore.activePhone, (newVal) => {
      phone_flag.value = newVal;
      console.log(newVal)
    }),
    // watch(() => indicatorStore.activeWifi, (newVal) => {
    //   wifi_flag.value = newVal;
    //   console.log(newVal)
    // })
    // const linkListProfile: HeaderProfileLink[] = [
    //   { icon: 'las la-bars', name: 'Профиль пользователя', route: 'services' },
    //   { icon: 'phone', name: 'Мои заявления', route: 'services' },
    //   { icon: 'person', name: 'Уведомления', route: 'services' },
    //   { icon: 'person', name: 'Написать в поддержку', route: 'ui-kit' },
    //   { icon: 'person', name: 'Выйти из системы', route: 'exit' },
    // ];

    // const profileLabel = computed(() => userStore.fio);

    // const profileRole = computed(() => userStore.roleName);

    function routeTo(routeName ) {
      if (routeName === 'exit') {
       
        router.push({ name: loginPageName });
      } else {
        router.push({ name: routeName });
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    return {
      routerMainPageName,
      changeVisibilitySidebar,
      wifi_flag,
      phone_flag,
      phone,
    };
  },
});
</script>
src/composables/useLoader