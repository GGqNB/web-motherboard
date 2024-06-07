<template>
    <s-dialog 
          :title = 'titleDialog'
          >
         <div class="home_wrapper" v-if="selectFlag">
            <s-select-backend
                v-model="formData.phone_id"
                option-label="phone"
                option-value="id"
                :label="currentPhone == null ? 'asd': 'qwe'"
                class="mt-base-25 "
                :getter="getPhones"
                />
                <!-- @update:modelValue="rfidCurrent.phone.phone = ''" -->
            <s-input
                v-model="formData.key"
                dense
                placeholder="Поиск по номеру"
                clearable
                class="mt-base-15"
            />

            <SBtn label="Изменить" width="base-xxxl" @click=changeRfid(props.rfidData.id) class="mt-base-15"/>
         </div>
          </s-dialog>
    </template>
    <script lang="ts">;
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import { Nfc } from 'src/declarations/responses/nfc';
import { PropType, defineComponent, onMounted, ref } from 'vue';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
import { useSelectBackend } from 'src/composables/useSelectBackend';
import { makeRequest } from 'src/composables/useRequest';
    
    export default defineComponent({
    name: 'DialogNfc',
    components: {
      SSelectBackend,
    },
    props : {
      rfidData: {
        type: Object as PropType<Nfc.NfcBrief>,
        required: true,
    },
    },
    setup(props) {
      const { getPhones } = useSelectBackend();
      // const rfidCurrent = ref<Nfc.NfcBrief>()
      const formData = ref<Nfc.NfcBare>({
        is_master: props.rfidData ? props.rfidData.is_master : false,
        key: props.rfidData ? props.rfidData.key : '',
        phone_id: props.rfidData ? props.rfidData.phone_id : 0
        // is_master: props.rfidData ? props.rfidData.is_master : false,
        // key: props.rfidData ? props.rfidData.key : '',
        // phone_id: props.rfidData ? props.rfidData.phone_id : 0
      }); 
      const changeRfid = async (frid_id : number) => {
        const response = await makeRequest(async () =>
         NfcApi.nfcUpdate(formData.value, frid_id));
        if (response) {

        }
      }
      const currentPhone = ref(props.rfidData ? props.rfidData.key : '');
      const labelSelect = () => {
       if(props.rfidData ? props.rfidData.phone.phone : ''){
        return props.rfidData.phone.phone
      }
    }
    const selectFlag = ref(props?.rfidData?.phone?.phone === null ? false : true);
      // onMounted (() => init())
    return {
      titleDialog: 'Rfid изменение',
      props,
      formData,
      getPhones,
      selectFlag,
      changeRfid,
      currentPhone,
      labelSelect,
      // rfidCurrent,
    };
      },
    });
    </script>
    