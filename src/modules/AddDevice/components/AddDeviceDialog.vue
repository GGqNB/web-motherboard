<template>
    <s-dialog 
          :show="show"
          :title = 'titleDialog'
          >
         <div class="home_wrapper">
          <q-form ref="form">
            <s-input
                v-model="geoData.city"
                dense
                placeholder="Введите город"
                clearable
                prefix="г."
                class="mt-base-15"
                disabled
                :rules= "[
                  NotEmpty(),
                  MinLength(3),
                ]"
            />
            <s-input
                v-model="geoData.street"
                dense
                placeholder="Введите улицу"
                clearable
                prefix="ул."
                class="mt-base-15"
                disabled
                :rules= "[
                  NotEmpty(),
                  MinLength(3),
                ]"
            />
            <s-input
                v-model="geoData.house"
                dense
                placeholder="Введите номер дома"
                prefix="№"
                clearable
                class="mt-base-15"
                disabled
                :rules= "[
                  NotEmpty(),
                ]"
            />
            <s-input
                v-model="geoData.flat"
                dense
                placeholder="Введите квартиру"
                clearable
                prefix="кв."
                class="mt-base-15"
                disabled
                :rules= "[
                  NotEmpty(),
                ]"
            />
            <SBtn
                    label="Привязать замок"
                    width="base-xxxl"
                    @click="onSubmit"
                    class="mt-base-15 full-width"
                />
          </q-form>
            <!-- <s-select-backend
                v-model="formData.phone_id"
                option-label="phone"
                option-value="id"
                :label="currentPhone == null ? '': ''"
                class="mt-base-25 "
                :getter="getPhones"
                
                /> -->
          
         </div>
          </s-dialog>
    </template>
    <script lang="ts">;
import NfcApi from 'src/backend/api/classes/NfcApiClass';
import { Nfc } from 'src/declarations/responses/nfc';
import { PropType, defineComponent, onMounted, ref, watch } from 'vue';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
import { makeRequest } from 'src/composables/useRequest';
import { useDeviceSizes } from 'src/composables/useDeviceSizes';
import { QForm } from 'quasar';
import { useNotifications } from 'src/composables/useNotifications';
import useValidation from 'src/composables/useValidation';
    
    export default defineComponent({
    name: 'AddDeviceDialog',
    components: {
    },
    props : {
      show: {
        type: Boolean,

    },
    },
    emits:['send-lock'],
    setup(props,{emit}) {

      const geoData = ref({
        city : '',
        street :'',
        house: '',
        flat:'',
      })
      const $notify = useNotifications();
      const form = ref < QForm > ();
      const onSubmit = async () => {
        const isValid = await form.value ?.validate();
            if (!isValid) {
                $notify.warning('Необходимо заполнить обязательные поля');
                return;
            }
            // 
            emit('send-lock', 'г.'+geoData.value.city+ ' ул.'+geoData.value.street+ ' №'+geoData.value.house+' кв.'+geoData.value.flat)
      }
      // watch(() => props.rfidData, (newVal) => {
      //       bindData.value = newVal
      //       })

        const {
            NotEmpty,
            MinLength,
        } = useValidation();
    return {
      titleDialog: 'Доблавление адреса  ',
      form,
      onSubmit,
      geoData,
      NotEmpty,
      MinLength,
    };
      },
    });
    </script>
    