import { ref } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import { makeRequest } from 'src/composables/useRequest';

import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoading';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser';
import { findNextAddress } from 'src/utils/array';
export function useList() {
    const { showLoading, hideLoading } = useLoading();
    const $user = useCurrentUser();
    const $notify = useNotifications();
    const btnFlag = ref(true);

    const listLocks = ref<Locks.LocksBrief[]>([]);
    const lockData = ref<Locks.LocksBare>({
      name: '',
      address: '',
      sub_address: 0,
      lock_type_id: 0,
      title : '',
      open_time: 0,
      close_time: 0,
    });
   
    const createLock = async () => {
      showLoading();
      lockData.value.address = findNextAddress(listLocks.value);
      lockData.value.name = newDevice.value.name;
      lockData.value.lock_type_id = newDevice.value.lock_type.id;
      lockData.value.close_time = newDevice.value.close_time;
      lockData.value.open_time = newDevice.value.open_time;
      lockData.value.sub_address = newDevice.value.sub_address;
      if(lockData.value.address != 'error'){
        const response = await makeRequest(async () =>
        LocksApi.update(lockData.value, newDevice.value.id)); 
        if (response) {
          console.log(response);
          listLocks.value.pop();
          listLocks.value.push(response);
          hideLoading();
          btnFlag.value = true;
        }else 
        {
          hideLoading();
        }
      }else{
        hideLoading();
        $notify.error('У вас закончилось место')
      }
        

        
    };
    
   

    const newDevice = ref<Locks.LocksBrief>()
    const searchDevice = () => {
      
      newDevice.value =  listLocks.value.find((obj) => obj.title === '');
      if(newDevice.value){
        $notify.success('Устройство найдено!')
        btnFlag.value = false;
      } else {
        $notify.warning('Устройство не обнаружено!')
      }
      console.log(newDevice.value);
      //   activityTemplates.value[index] = res.data;
      
      
    }

    const init = async (): Promise<void>  => {
      try {
       
        // showLoading();
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
      newDevice,
      createLock,
      searchDevice,
      lockData,
      btnFlag,

    }
  }
  