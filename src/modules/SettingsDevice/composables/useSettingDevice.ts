import { ref,watch } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoader';
import { useSelectBackend } from 'src/composables/useSelectBackend';
export function useList() {

    const { showLoading, hideLoading } = useLoading();
    const { getLocks } = useSelectBackend();
    const listLocks = ref<Locks.LocksBrief[]>([]);
    const notification = useNotifications();
    const test = ref();
    const lockData = ref<Locks.LocksBrief>({
      name: '',
      address: '',
      sub_address: 0,
      id: 0,
      title : '',
      open_time: 0,
      close_time: 0,
      lock_type: {
        id: 0,
        name:'',
      }
      });
      const lockFetchData = ref({
        name: lockData.value.name,
        address: lockData.value.address,
        sub_address: lockData.value.sub_address,
        lock_type_id: lockData.value.lock_type.id,
        title : lockData.value.title,
        open_time: 0,
        close_time: 0,
     });
     watch(lockData, (newValue) => {
      lockFetchData.value.name = newValue.name;
      lockFetchData.value.address = newValue.address;
      lockFetchData.value.sub_address = newValue.sub_address;
      lockFetchData.value.lock_type_id = newValue.lock_type.id;
      lockFetchData.value.title = newValue.title;
    }, { deep: true });

 

    const updateTimeLock = async () => {
      if(Number(lockFetchData.value.open_time)< 201){
      lockFetchData.value.open_time = Number(lockFetchData.value.open_time) * 10;
      lockFetchData.value.close_time = Number(lockFetchData.value.close_time) * 10;
      const response = await makeRequest(async () =>
        LocksApi.update(lockFetchData.value, lockData.value.id)); 
        if (response) {
          notification.success('Время успешно изменено');
          lockData.value.open_time = lockFetchData.value.open_time;
          lockData.value.close_time = lockFetchData.value.close_time ;
          lockFetchData.value.open_time = lockFetchData.value.open_time / 10;
          lockFetchData.value.close_time = lockFetchData.value.close_time / 10;

        }else 
        {
          notification.warning('Произошла ошибка');
        }
      }else{
        notification.warning('Много времени');
      }
      
    }
  
    return {
      listLocks,
      lockData,
      lockFetchData,
      updateTimeLock,
      getLocks,
      test

    }
  }
  
  // const bindLock = async () => {
  //   const response = await makeRequest(async () =>
  //     UserApi.check_create(phoneData.value));
  //   if(response){
  //     phoneData.value.phone = response.data.phone;
  //     uuidData.value.uuid = response.data.uuid;
  //     console.log(uuidData.value)
  //       const res = await makeRequest(async () =>
  //         UserApi.bind_lock(uuidData.value, lockData.value.id)); 
  //           if (response) {
  //             notification.success('Привязка произошла успешно');
  //           }
  //           notification.error('Ошибка');
  //   }else{
  //     notification.warning('Номера нет в бд');
  //   } 
  // }