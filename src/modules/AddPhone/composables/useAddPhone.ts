import { ref } from 'vue';
import { Network } from 'src/declarations/responses/network';
import NetworkApi from 'src/backend/api/classes/NetworkApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { useNotifications } from 'src/composables/useNotifications';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser'; 
import { stringNumberWithoutSymbols }  from 'src/utils/helpers';
import { useLoading } from 'src/composables/useLoading';
import { useIndicator } from 'src/composables/useIndicator';

export function useList() {
  const $currentUser = useCurrentUser();
  const { showLoading, hideLoading } = useLoading();
  const $indicator = useIndicator();
  const notification = useNotifications();

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
  const phoneData = ref({
    phone : '',
  });
 
  const addPhone = async () => {
    phoneData.value.phone = stringNumberWithoutSymbols(phoneData.value.phone)
    const response = await makeRequest(async () =>
      UserApi.check_create(phoneData.value));
      try{
        if (response) {
          $currentUser.userDataSet.setPhone(response.data.phone); 
          $currentUser.userDataSet.setUuid(response.data.uuid); 
          $indicator.indicatorDataSet.setActivePhone(true);
          notification.success('Успешное сохранение номера');
          
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
      }
      notification.error('Неправильный пароль');
    
  }
    
    
    const listWifi = ref<Network.NetworkBare[]>([]);

    const init = async (): Promise<void>  => {
      showLoading();
      phone_flag.value = $indicator.indicatorDataSet.getActivePhone()
      isLoading.value = false;
      try {
        phoneConnect.value = $indicator.indicatorDataSet.getActivePhone();
        const response = await makeRequest(async () =>
          NetworkApi.list());
          
        if (response) {
          listWifi.value = response.data ;
          isLoading.value = true;
          console.log( listWifi.value);
        }
      } finally {
       hideLoading()
      }
    }
  
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
      phoneData,

    }
  }
  