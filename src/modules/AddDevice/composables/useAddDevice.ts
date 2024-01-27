/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ref } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { User } from 'src/declarations/responses/user';
import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoading';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser';
import SystemApi from 'src/backend/api/classes/SystemApiClass';
export function useList() {
    const { showLoading, hideLoading } = useLoading();
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
    const uuid = ref<User.UserBare>({
      uuid: '',
    });
    const createLock = async () => {
      showLoading();
      lockData.value.address = newDevice.value.address;
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
          lockData.value.title = '';
          init()

        }else 
        {
          hideLoading();
        }
      }else{
        hideLoading();
      }
      bindLocks();
      refreshSystem();
    };
    const foundFirstElement = ref(false);
    const shouldDisplayElement = (item) => {
      if (!item.title && !foundFirstElement.value) {
        foundFirstElement.value = true;
        return true;
      }
      return false;
    };

    const newDevice = ref<Locks.LocksBrief>()
    const searchDevice = () => {
      
      newDevice.value =  listLocks.value.find((obj) => obj.title === '');
      if(newDevice.value){
        $notify.success('Устройство найдено!')
        btnFlag.value = false;
      } else {
      }
      //   activityTemplates.value[index] = res.data;
      
      
    }
    
    const bindLocks = async () => {
      const responce = await makeRequest(async () =>
      UserApi.bind_lock(newDevice.value.id)); 
      if (responce) {
        console.log(responce)
        $notify.success('Устройства привязаны')
      }else{
        $notify.error('Устройство не привязано')
      }
    }

    const refreshSystem = async () => {
      const responce = await makeRequest(async () =>
      SystemApi.get()); 
      if (responce) {
      }
    }
    
    const newLocks = ref<Locks.LocksBrief[]>([]);
    const filterNewLocksArray = (array : Locks.LocksBrief[]) => {
      return array.filter(item => item.title === '');
    };

    const init = async (): Promise<void>  => {
      try {
       
        // showLoading();
        const response = await makeRequest(async () =>
         LocksApi.list());
          
        if (response) {
          listLocks.value = response.data;
          newLocks.value = filterNewLocksArray(listLocks.value);
          searchDevice();
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
      bindLocks,
      shouldDisplayElement,
      foundFirstElement,
      newLocks,

    }
  }
  