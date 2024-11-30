import { computed, ref, watch} from 'vue';
import { makeRequest } from 'src/composables/useRequest';
import { Tables } from 'src/declarations/components/table';
import { TABLE_SETTINGS } from 'src/constants/table-settings';
import { usePagination } from 'src/composables/usePagination';
import { useQueryString } from 'src/composables/useQueryString';
import { BasePagination } from 'src/declarations/components/pagination';
import { Nfc } from 'src/declarations/responses/nfc';
import { useServiceFilters } from './useFilters';
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import {useConfirmationDialog} from 'src/composables/useConfirmationDialog';
import { useNotifications } from 'src/composables/useNotifications';
import { useSelectBackend } from 'src/composables/useSelectBackend';
import { useDeviceSizes } from 'src/composables/useDeviceSizes';
import { utils, writeFileXLSX } from "xlsx";

export function useList(){ 

 const users = ref([]);
 const TABLE_COLUMNS: Array < Tables.TableColumn > = [
  {
    name: 'indicators',
    label: '',
    field: 'indicators',
    align: 'center',
    sortable: false,
},
  {
    name: 'phone',
    label: 'Телефон',
    field: 'phone',
    align: 'center',
    sortable: false,
},
{
    name: 'key',
    label: 'NFC',
    field: 'key',
    align: 'center',
    sortable: true,
},
{
  name: 'comment',
  label: 'Комментарий',
  field: 'comment',
  align: 'center',
  sortable: true,
},
{
  name: 'action',
  label: '',
  field: 'action',
  align: 'center',
  sortable: true,
},
];
const { getLocks } = useSelectBackend();
const visibleUpload = ref(false);
const visibleDialog = ref(false);
const list = ref<Nfc.NfcBrief[]>([]);
const {
  isMobile
} = useDeviceSizes();
const { filterParams, sanitizeQueryFilterParams, defaultFilterParams } = useServiceFilters();

const { paginationParams, sanitizeQueryPagination, setPaginationFromData, defaultPaginator } =
    usePagination();
const receive = async (response: Awaited<ReturnType<typeof NfcApi.nfcList>>) => {
    list.value = response.items;
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
        await  NfcApi.nfcList(combinedParameters.value)
      )
    );
    const onRequest = async ({ pagination: tablePagination }: { pagination: BasePagination }) => {
    setPaginationFromData(tablePagination);

    await fetch();
  };
const init = async () => {

  const queryParams = getQueryParams();
  setPaginationFromData(queryParams);
  console.log(paginationParams.value)
};

const clearParameters = async () => {
  paginationParams.value = defaultPaginator();
  filterParams.value = defaultFilterParams();

  await fetch();
};

const deleteRfid = async (rfid_id : number) => {
  await NfcApi.nfcDelete(rfid_id);
  const index = list.value.findIndex((item) => item.id === rfid_id);
  list.value.splice(index, 1);
}
const $notify = useNotifications();
const rfidCurrent = ref<Nfc.NfcBrief>();
const openSetting = async (rfidData : Nfc.NfcBrief) => {
  rfidCurrent.value = rfidData;
  visibleDialog.value = !visibleDialog.value;
}

const {
  withConfirmation
} = useConfirmationDialog();
// @click=deleteTempUser(worker.id)
const visibleConfirm = ref(false);
const onViewConfirmationDialog = (rfid : Nfc.NfcBrief) => {
  visibleConfirm.value = true;
  withConfirmation({
      title: 'Удаление',
      message: 'Вы точно хотите удалить RFID?'
  }, () => {
      deleteRfid(rfid.id);
      visibleConfirm.value = true;
  }, () => {
      visibleConfirm.value = true;
  });
};

const currentLockId = ref(0);
const pushFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await makeRequest(async () => NfcApi.nfcUpload(formData, currentLockId.value)); 
  if (response) { 
    $notify.success('Успешно доблены RFID')
    visibleUpload.value = false;
    clearParameters();
  }else{
    return
  }
}


const goUpload = async () => {
  return new Promise(() => {
    setTimeout(() => {
      pushFile(selectedFile.value[0]);
    }, 2000);
  });
}
const uploader = ref(null); 
const selectedFile = ref(null);

const selectedFileF = (file) => {
  selectedFile.value = file
  console.log(selectedFile.value)
}

const downloadPattern =() => {
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet([
      ['Телефон', 'RFID', 'Комментарий'],
      ['9XXXXXXXXXX', '0xXXXXXX', ''],
    ]);
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFileXLSX(wb, 'шаблон.xlsx');
}

  return {
    rfidCurrent,
    openSetting,
    deleteRfid,
    init,
    list,
    TABLE_SETTINGS, 
    TABLE_COLUMNS,
    users,
    paginationParams, 
    onRequest,
    visibleDialog,
    filterParams,
    fetch,
    clearParameters,
    onViewConfirmationDialog,
    visibleUpload,
    goUpload,
    getLocks,
    currentLockId,
    isMobile,
    uploader,
    selectedFile,
    selectedFileF,
    downloadPattern
  };
}


