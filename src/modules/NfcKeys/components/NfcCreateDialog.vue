<template>
    <s-dialog 
          :title = 'titleDialog'
          >
          <div class='home_wrapper' v-if="visibilyNewPhone">
            <div>Добавление нового телефона в систему: </div>
           <q-form ref="formPhone"> 
            <s-input
                v-model="phoneData.phone"
                type="text"
                prefix="+7"
                maxlength="10"
                dense
                placeholder="Введите метку"
                clearable
                class="mt-base-10"
                unmasked-value
                :rules="[
                  NotEmpty(),
                  ValidMobilePhone(),
                ]"
            />
            <SBtn label="Добавить" width="base-xxxl" @click="createPhone" class="mt-base-15"/>
           </q-form>
            <div class='flex justify-center'>
              <div class="blue-line"></div>
            </div>
          </div>
          <q-form ref="form">
         <div class="home_wrapper">
            <s-select-backend
                v-model="formData.phone_id"
                option-label="phone"
                option-value="id"
                label="Выберите номер"
                class="mt-base-25 "
                prefix='+7'
                :getter="getPhones"
                @add="visibilyNewPhone = !visibilyNewPhone"
                no-data-label="Такого номера нет, можете его создать"
                :rules="[
                  NotEmpty(),
                ]"
                />
            <s-input
                v-model="formData.key"
                type="text"
                prefix="0x"
                maxlength="14"
                dense
                placeholder="Введите метку"
                clearable
                class="mt-base-15"
                
                :rules="[
                  NotEmpty(),
                ]"
            />

            <SBtn label="Добавить" width="base-xxxl" @click="props.createRow(onSubmit(false))" class="mt-base-15"/>
            <SBtn label="Добавить и закрыть" width="base-xxxl" @click="props.createRow(onSubmit(true))" class="mt-base-15"/>

         </div>
        </q-form>
          </s-dialog>
    </template>
    <script lang="ts">;
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import { Nfc } from 'src/declarations/responses/nfc';
import { PropType, computed, defineComponent, onMounted, ref } from 'vue';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
import { useSelectBackend } from 'src/composables/useSelectBackend';
import { makeRequest } from 'src/composables/useRequest';
import { QForm } from 'quasar';
import { useNotifications } from 'src/composables/useNotifications';
import  useValidation  from 'src/composables/useValidation';
import PhoneApi from 'src/backend/api/classes/PhoneApiClass';
import { useQueryString } from 'src/composables/useQueryString';
import { useServiceFilters } from '../composables/useFilters';
    export default defineComponent({
    name: 'DialogCreateNfc',
    components: {
      SSelectBackend,
    },
    props:{
      createRow: Function
    },
    setup(props) {
      const {
          NotEmpty,
          ValidMobilePhone
      } = useValidation();
      const { getPhones } = useSelectBackend();
      // const rfidCurrent = ref<Nfc.NfcBrief>()
      const formData = ref<Nfc.NfcBare>({
        is_master: false,
        key: '',
        phone_id: null,
      }); 
      const openPhoneAdd = () => {
        console.log('ОК')
      }
      const $notify = useNotifications();
      const form = ref<QForm>();
      const formPhone = ref<QForm>();
      const onSubmit = async (andClose: boolean) => {
      const isValid = await form.value?.validate();
      if (!isValid) {
        $notify.warning('Необходимо заполнить обязательные поля');
        return;
       }
       formData.value.key = '0x'+formData.value.key
      const response = await makeRequest(() => NfcApi.nfcCreate(formData.value));
      if(response){
        formData.value.key = '';
        formData.value.phone_id = null;
        formData.value.is_master = andClose;
        return response
      };

    }

      const visibilyNewPhone = ref(false)
      const phoneData = ref({
        phone: '',
      })

      const createPhone = async () => {
        const isValid = await formPhone.value?.validate();
        if (!isValid) {
        $notify.warning('Необходимо заполнить обязательные поля');
        return;
       }

        const response = await await makeRequest(() => PhoneApi.phoneCreate(phoneData.value));
        if(response){
          $notify.success('Номер добавлен для выбора')
        }
      }
    return {
      titleDialog: 'Rfid изменение',
      props,
      formData,
      getPhones,
      onSubmit,
      NotEmpty,
      form,
      openPhoneAdd,
      visibilyNewPhone,
      phoneData,
      formPhone,
      createPhone,
      ValidMobilePhone
      // fetch
     
      // rfidCurrent,
    };
      },
    });
    </script>
    