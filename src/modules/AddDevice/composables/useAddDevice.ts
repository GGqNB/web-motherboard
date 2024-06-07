/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computed, ref } from 'vue';
import { Locks } from 'src/declarations/responses/locks';
import LocksApi from 'src/backend/api/classes/LocksApiClass';
import { makeRequest } from 'src/composables/useRequest';
import { User } from 'src/declarations/responses/user';
import { useNotifications } from 'src/composables/useNotifications';
// import { useCurrentUser } from 'src/declarations/composables/useCurrentUser'; 
import { useLoading } from 'src/composables/useLoader';
import UserApi from 'src/backend/api/classes/UserApiClass';
import { useCurrentUser } from 'src/composables/useCurrentUser';
import SystemApi from 'src/backend/api/classes/SystemApiClass';
import { useRoute } from "vue-router";
import { BasePagination } from 'src/declarations/components/pagination';
import { useQueryString } from 'src/composables/useQueryString';
import { usePagination } from 'src/composables/usePagination';
import { useServiceFilters } from './useFilters';

export function useList() {
    const { showLoading, hideLoading } = useLoading();
    const $notify = useNotifications();
    const btnFlag = ref(true);
    const $route = useRoute();
    const listLocks = ref<Locks.LocksBrief[]>([]);
    const lockData = ref<Locks.LocksBare>({
      name: '',
      address: '',
      sub_address: 0,
      lock_type_id: 0,
      title : '',
      open_time: 0,
      close_time: 0,
      is_new: true,
    });
    const uuid = ref<User.UserBare>({
      uuid: '',
    });
    const createLock = async () => {
      showLoading();
      lockData.value.address = newLock.value.address;
      lockData.value.name = newLock.value.name;
      lockData.value.lock_type_id = newLock.value.lock_type.id;
      lockData.value.close_time = newLock.value.close_time;
      lockData.value.open_time = newLock.value.open_time;
      lockData.value.sub_address = newLock.value.sub_address;
      lockData.value.is_new = false;

      if(lockData.value.address != 'error'){
        const response = await makeRequest(async () =>
        LocksApi.update(lockData.value, newLock.value.id)); 
        if (response) {
          // listLocks.value.pop();
          listLocks.value.push(response);
          hideLoading();
          btnFlag.value = true;
          lockData.value.title = '';
          newLock.value = (null);
        }else 
        {
          hideLoading();
        }
      }else{
        hideLoading();
      }
      bindLocks();
      searchNewDevice();
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
    
    const newLock = ref<Locks.LocksBrief>();
    const filternewLockArray = (array : Locks.LocksBrief[]) => {
      return array.filter(item => item.title === '');
    };

    // const init = async (): Promise<void>  => {
    //   try {
       
    //     // showLoading();
    //     const response = await makeRequest(async () =>
    //      LocksApi.list());
          
    //     if (response) {
    //       listLocks.value = response.items;
    //       newLock.value = filternewLockArray(listLocks.value);
    //       searchDevice();
    //     } else{
    //       hideLoading();
            
    //     }
    //   } finally {
    //     hideLoading();
    //   }
    // }
    
    const { filterParams, sanitizeQueryFilterParams, defaultFilterParams } = useServiceFilters();
    const { paginationParams, sanitizeQueryPagination, setPaginationFromData, defaultPaginator } =
      usePagination();
    const receive = async (response: Awaited<ReturnType<typeof LocksApi.list>>) => {
      listLocks.value = response.items;
      setPaginationFromData(response);
      await setQueryParams(paginationParams.value);
      await setQueryParams(filterParams.value);
    };

    const combinedParametersSanitizers = {
    ...sanitizeQueryFilterParams(),
    ...sanitizeQueryPagination(),
      };

    const combinedParameters = computed(() => ({ ...filterParams.value ,...paginationParams.value }));
    const { getQueryParams, setQueryParams } = useQueryString(combinedParametersSanitizers, {
     ...filterParams.value,  
     ...paginationParams.value,
    });

    const fetch = async () =>
      makeRequest(async () =>
      receive(
        await  LocksApi.list(combinedParameters.value)
      )
    );
    const onRequest = async ({ pagination: tablePagination }: { pagination: BasePagination }) => {
    setPaginationFromData(tablePagination);

    await fetch();
  };
const init = async () => {
  await fetch();
  const queryParams = getQueryParams();
  setPaginationFromData(queryParams);
  await searchNewDevice();
  console.log(listLocks.value)
};

const searchNewDevice = async () =>{
  newLock.value = (null);
  const response = await makeRequest(async () =>
  LocksApi.listNew()); 
  if (response.items.length !== 0) {
    newLock.value = response.items[0];
    $notify.success('Устройство найдено!')
    btnFlag.value = false;
  }
  else{
    btnFlag.value = true;
  }
}
    return {
      listLocks,
      init,
      newLock,
      createLock,
      searchDevice,
      lockData,
      btnFlag,
      bindLocks,
      shouldDisplayElement,
      foundFirstElement,
      $route,
      paginationParams,
      fetch,
      searchNewDevice

    }
  }
  