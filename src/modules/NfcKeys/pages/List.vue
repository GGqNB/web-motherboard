<template>
<s-page>

    <s-header :create-btn="true" title="RFID метки" label-btn="Добавить из Exel" @click="visibleUpload = !visibleUpload"/>
    <div class="home_wrapper">
      <div v-if="visibleUpload" class=mt-base-25> 
        <s-select-backend
                v-model="currentLockId"
                option-label="title"
                option-value="id"
                label="Выберите устройство"
                class="mt-base-25 mb-base-15"
                :getter="getLocks"
                no-data-label="Нет устройств"
            />
      <q-uploader
      accept=".xlsx"
      :factory="goUpload"
      :loading="false"
      :max-file-size="2 * 1024 * 1024"
      style="width: 350px"
    />
      </div>
      <div v-if="visibleUpload">
        <SBtn label="Вернуться назад" width="base-xxxl" @click="visibleUpload  = false" class="mt-base-15"/>
      </div>
        <div v-if="!visibleUpload">
        
            <s-input
            v-model="filterParams.phone_filter"
                debounce="600"
                dense
                placeholder="Поиск по номеру"
                prefix="+7"
                unmasked-value
                clearable
                @update:modelValue="fetch"
                class="mt-base-15 input--home"
            />
        <SBtn label="Добавить RFID" width="base-xxxl" @click="visibleCreateDialog = true" class="mt-base-15"/>
        </div>
        <div class="flex mt-base-15" >
          <div class="orange-info"></div>
          <span>&nbsp; Локальная связь</span>
        </div>
        <div class="flex mt-base-15" >
          <div class="red-info"></div>
          <span>&nbsp; Номер локальный</span>
        </div>
        <div class="mt-base-25">
            <q-table
                class="s-table--wrapper bordered "
                table-class="s-table"
                dense
                flat
                :rows="list"
                :columns="TABLE_COLUMNS"
                :no-data-label="TABLE_SETTINGS.NO_DATA_LABEL"
                :no-results-label="TABLE_SETTINGS.NO_RESULTS_LABEL"
                :rows-per-page-options="TABLE_SETTINGS.ROWS_PER_PAGE_LIST"
                :rows-per-page-label="TABLE_SETTINGS.ROWS_PER_PAGE_LABEL"
                hide-bottom
            >
            <template v-slot:body="props">
                <q-tr :props="props" :class="props.row.local ? 'local-bind' : ''">
                    <q-td key="phone" :props="props" :class="props.row.phone.local ? 'text-red':''" class="fw-700">
                        {{ props.row.phone.phone }}
                    </q-td>
                    <q-td key="key" :props="props">
                        {{ props.row.key  }}
                    </q-td>
                    <q-td key="action" :props="props">
                      <q-btn variant="" icon="more_vert" dense flat>
          <q-menu>
            <q-list>
              <q-item
                v-close-popup
                clickable
                dense
                @click = 'openSetting(props.row)'
              >
                <q-item-section>Изменить</q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                dense
                @click="onViewConfirmationDialog(props.row)"
              >
                <q-item-section class="text-red-base-1">Удалить</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
                    </q-td>
                  </q-tr>
                  </template>
                <!-- <template #body-cell-phone="props">
                    <q-td :props="props">
                        {{ props.value !== null ? props.value.phone :'Номер не привязан'  }}
                    </q-td>
                </template>
                <template #body-cell-action="props">
      <q-td :props="props" class="tr-action_button">
        <q-btn variant="" icon="more_vert" dense flat>
          <q-menu>
            <q-list>
              <q-item
                v-close-popup
                clickable
                dense
                @click = 'openSetting(props.row)'
              >
                <q-item-section>Изменить</q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                dense
                @click="onViewConfirmationDialog(props.row)"
              >
                <q-item-section class="text-red-base-1">Удалить</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template> -->
            </q-table>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="paginationParams.page"
                    :max="paginationParams.pages"
                    :max-pages="5"
                    :boundary-numbers="false"
                    @update:model-value="fetch"
                    direction-links
                />
            </div>
            <nfc-dialog v-model="visibleDialog" :rfid-data="rfidCurrent"/>
            <nfc-create-dialog v-model="visibleCreateDialog" :create-row="createRequest"/>
        </div>
    </div>
</s-page>
</template>

<script lang="ts">
import {
    TABLE_SETTINGS
} from 'src/constants/table-settings';
import {
    Tables
} from 'src/declarations/components/table';
import { API_SERVER } from 'src/constants/common';
import {
    defineComponent,
    onMounted,
    ref,
} from 'vue';
// import SInput from 'src/components/ui/Input.vue';
// import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
import {
    useTimer
} from 'src/composables/useTimer'
import NfcDialog from '../components/NfcDialog.vue'
import NfcCreateDialog from '../components/NfcCreateDialog.vue'

import {
    useList
} from '../composables/useList';
import { useDeviceSizes } from 'src/composables/useDeviceSizes';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
export default defineComponent({
    name: 'NFCPage',
    components: {
        // SSelectBackend,
        NfcDialog,
        NfcCreateDialog,
        SSelectBackend
    },
    setup() {
        const {
            openSetting,
            init,
            list,
            TABLE_SETTINGS,
            TABLE_COLUMNS,
            paginationParams,
            onRequest,
            visibleDialog,
            filterParams,
            fetch,
            clearParameters,
            rfidCurrent,
            deleteRfid,
            onViewConfirmationDialog,
            visibleUpload,
            goUpload,
            getLocks,
            currentLockId
        } = useList();
        const { isMobile } = useDeviceSizes();
        const visibleCreateDialog = ref(false);
        const createRequest = (NewDataPromise) => {
          console.log(NewDataPromise);
          NewDataPromise.then((NewRfid) => {
          if(NewRfid == undefined){
            visibleCreateDialog.value = true;
          }else{
              // console.log(NewService);
              list.value.unshift(NewRfid);
              if(!NewRfid.is_master){
                visibleCreateDialog.value = false;
              }else{
                visibleCreateDialog.value = true;
              }
            }
          }).catch((error) => {
            console.error('Error while processing NewDataPromise:', error);
          });
        }
        const {
            longTouch,
            endLongTouch
        } = useTimer();
        onMounted(() => init())
        return {
            rfidCurrent,
            filterParams,
            openSetting,
            deleteRfid,
            init,
            fetch,
            onRequest,
            paginationParams,
            list,
            visibleDialog,
            longTouch,
            endLongTouch,
            TABLE_SETTINGS,
            TABLE_COLUMNS,
            visibleCreateDialog,
            createRequest,
            onViewConfirmationDialog,
            visibleUpload,
            goUpload,
            API_SERVER,
            isMobile,
            getLocks,
            currentLockId
        };
    },
});
</script>
