import { ref } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import { makeRequest } from 'src/composables/useRequest';

// import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoading';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser';
export function useList() {
    const { showLoading, hideLoading } = useLoading();
    const $user = useCurrentUser();
    const listLocks = ref<Locks.LocksBrief[]>([]);
    const lockData = ref<Locks.LocksBare>({
      name: '',
      address: '0x',
      sub_address: 0,
      lock_type_id: 1,
    });
    const uuid = ref({
      uuid : '',
    });
    
    const createLock = async () => {
      // phoneData.value.phone = extractPhoneNumber(phoneData.value.phone)
      uuid.value.uuid = $user.userDataSet.getUuid();
      showLoading();
      const response = await makeRequest(async () =>
        
        LocksApi.create(lockData.value)); 
        if (response) {
          console.log(response);
          listLocks.value.push(response);
          hideLoading();
        //   const res = await makeRequest(async () =>
        //     UserApi.bind_lock(uuid.value, response.id)); 
        //     if (response) {
        //     console.log(res);
            
            
        // }
        }else 
        {
          hideLoading();
        }

        
    };
    

// Получите значение uuid с использованием watchUuid
   

// Теперь currentUuid содержит текущее значение uuid из вашего хранилища
    const init = async (): Promise<void>  => {
      try {
       
        showLoading();
        const response = await makeRequest(async () =>
         LocksApi.list());
          
        if (response) {
          listLocks.value = response.data ;
          console.log( listLocks.value);
        } else{
          hideLoading();
            
        }
      } finally {
        hideLoading();
      }
    }
  
    return {
      listLocks,
      init,
      createLock,
      lockData,

    }
  }
  