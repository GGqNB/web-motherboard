import { ref } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoading';
export function useList() {

    const { showLoading, hideLoading } = useLoading();
    const listLocks = ref<Locks.LocksBrief[]>([]);
    const notification = useNotifications();
    const lockData = ref<Locks.LocksBrief>({
      name: '',
      address: '',
      sub_address: '',
      id: 0,
      nfc_keys: [],

    });
    const phoneData = ref({
      phone: '',
    })
    const uuidData = ref({
      uuid: '',
    })


    const bindLock = async () => {
      const response = await makeRequest(async () =>
        UserApi.check_create(phoneData.value));
      if(response){
        phoneData.value.phone = response.data.phone;
        uuidData.value.uuid = response.data.uuid;
        console.log(uuidData.value)
          const res = await makeRequest(async () =>
            UserApi.bind_lock(uuidData.value, lockData.value.id)); 
              if (response) {
                notification.success('Привязка произошла успешно');
              }
              notification.error('Ошибка');
      }else{
        notification.warning('Номера нет в бд');
      }

      
      
    }
    const init = async (): Promise<void>  => {
      try {
        showLoading();
        const response = await makeRequest(async () =>
         LocksApi.list());
          
        if (response) {
          listLocks.value = response.data ;
        }
      } finally {
        hideLoading();
      }
    }
  
    return {
      phoneData,
      listLocks,
      init,
      bindLock,
      lockData,

    }
  }
  