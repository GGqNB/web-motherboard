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
                  MaxLength(255),
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
                  MaxLength(255),
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
                  GreaterThenOrEqual(1),
                  MaxLength(9),
                  NotEmpty(),
                ]"
            />
            <div class="flex mt-base-15">
              <div class="mt-base-10">У меня нет № квартиры</div>
              <div><q-checkbox v-model="noFlat"></q-checkbox></div>
            </div>
            <s-input
                v-if="!noFlat"
                v-model="geoData.flat"
                dense
                placeholder="Введите квартиру"
                clearable
                type="number"
                prefix="кв."
                class="mt-base-15"
                disabled
                :rules= "[
                  GreaterThenOrEqual(1),
                  MaxLength(3),
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
      const noFlat = ref(false);
      const $notify = useNotifications();
      const form = ref < QForm > ();
      const onSubmit = async () => {
        const isValid = await form.value ?.validate();
            if (!isValid) {
                $notify.warning('Необходимо заполнить обязательные поля');
                return;
            }
            if(noFlat.value){
              geoData.value.flat = '-';
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
            IsInteger,
            MaxLength,
            GreaterThenOrEqual
        } = useValidation();
    return {
      titleDialog: 'Доблавление адреса  ',
      form,
      onSubmit,
      geoData,
      NotEmpty,
      MinLength,
      IsInteger,
      MaxLength,
      GreaterThenOrEqual,
      noFlat
    };
      },
    });
    </script>
    