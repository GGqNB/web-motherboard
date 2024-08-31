import { ref } from 'vue';
import { Network } from 'src/declarations/responses/network';
import NetworkApi from 'src/backend/api/classes/NetworkApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { useNotifications } from 'src/composables/useNotifications';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser'; 
import { stringNumberWithoutSymbols }  from 'src/utils/helpers';
import { useLoading } from 'src/composables/useLoader';
import { useIndicator } from 'src/composables/useIndicator';
import { useRoute } from "vue-router";
import { useIndicatorStore } from 'src/stores/indicator.store';

export function useList() {
  const $currentUser = useCurrentUser();
  const { showLoading, hideLoading } = useLoading();
  const $indicator = useIndicator();
  const notification = useNotifications();
  const $route = useRoute();
  const isLoading = ref(false);
  const wifi_flag = ref(false);
  const phone_flag = ref(false);
  const phoneConnect = ref(false);

  const selectedWifi = ref();
  const wifiPassword = ref('');
  const wifiData = ref({
    ssid : '',
    password: '',
  });
  const userData = ref({
    username : '',
    password: ''
  });
 
  const addPhone = async () => {
    userData.value.username = stringNumberWithoutSymbols(userData.value.username)
    const response = await makeRequest(async () =>
      UserApi.login(userData.value));
      try{
        if (response) {
          $currentUser.userDataSet.setPhone(response.data.phone); 
          $currentUser.userDataSet.setUuid(response.data.uuid); 
          getMe();
          $indicator.indicatorDataSet.setActivePhone(true);
          notification.success('Успешное сохранение номера');
          phone_flag.value = true;
          
          
        }
      }catch {
        notification.warning('Ошибка');
      }
      
      
  };
  const wifiConnect = async () => {
    const response = await makeRequest(async () =>
      NetworkApi.connect(wifiData.value)); 
      if (response) {
        wifi_flag.value = true;
        $indicator.indicatorDataSet.setActiveWifi(true);
        notification.success('Успешное подключение');
        await currentNetwork();
      }
      notification.error('Неправильный пароль');
    
  }

  const currentNetwork = async () => {
    const response = await makeRequest(async () => NetworkApi.active());
    $indicator.indicatorDataSet.setCurrentNetwork(response[0].name)
  }

  const getMe = async () => {
    const response = await makeRequest(async () =>
      UserApi.me()); 
      if (response) {
        notification.success('Я работаю');
      }
    
  }
    
    const listWifi = ref<Network.NetworkBrief[]>([]);
    const getWifi = async () =>{
      isLoading.value = false;
      try {
        const response = await makeRequest(async () =>
        NetworkApi.list());
          
        if (response) {
          listWifi.value = response.data ;
          isLoading.value = true;
        }
      } finally {
      }
    }
    const indicatorStore = useIndicatorStore();
    const init = async (): Promise<void>  => {
      try{
        const response = await makeRequest(async () =>
        UserApi.me()); 
        if (response) {
          phone_flag.value = true;
        }
      }catch{
        phone_flag.value = false;
        console.log('не сСработал метод')


      }
      getWifi();
      
    }
    // phone.value = $currentUser.userDataSet.getPhone() 
    return {
      listWifi,
      init,
      selectedWifi,
      phoneConnect,
      wifiData,
      wifiConnect,
      wifi_flag,
      wifiPassword,
      phone_flag,
      addPhone,
      userData,
      $route,

    }
  }
  