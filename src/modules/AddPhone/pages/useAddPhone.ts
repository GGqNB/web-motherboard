import { ref } from "vue";
import { Network } from "src/declarations/responses/network";
import NetworkApi from "src/backend/api/classes/NetworkApiClass";
import { makeRequest } from "src/composables/useRequest";
import { useNotifications } from 'src/composables/useNotifications';
import axios from 'axios';

export function useList() {
  const wifi_flag = ref(false);
  const phone_flag = ref(false);
  const notification = useNotifications();
  const addPhone = () => {
    phone_flag.value = !phone_flag.value
    
    notification.success('Телефон успешно добавлен');
  };
  const wifiConnect = () => {
    wifi_flag.value = !wifi_flag.value
    notification.success('Успешное подключение');
  }
  const selectedWifi = ref(null);
    const isLoading = ref(false);
    const listWifi = ref<Network.NetworkBare[]>([]);
  
    const init = async (): Promise<void>  => {
      isLoading.value = false;
      try {
        axios
        .get('http://10.8.0.118/networks/')
        .then(response => (console.log(response)));
        const response = await makeRequest(async () =>
          NetworkApi.list());
          
        if (response) {
          listWifi.value = response.data;
          isLoading.value = true;
          console.log( listWifi.value);
        }
      } finally {
        //
      }
    }
  
    return {
      listWifi,
      init,
      selectedWifi,
      wifiConnect,
      wifi_flag,
      phone_flag,
      addPhone,

    }
  }
  