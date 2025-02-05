<template>
<s-page>

    <s-header
        :create-btn="true"
        title="RFID метки"
        label-btn="Добавить из Exel"
        @click="visibleUpload = !visibleUpload" />
    <div class="home_wrapper">
        
        <div v-if="visibleUpload" class=mt-base-25>
            <s-select-backend
                v-model="currentLockId"
                option-label="title"
                option-value="id"
                label="Выберите устройство"
                class="mt-base-25 mb-base-15"
                :getter="getLocks"
                no-data-label="Нет устройств" />
            <q-uploader
                ref="uploader"
                accept=".xlsx"
                :factory="goUpload"
                :loading="false"
                @added="selectedFileF"
                @removed="selectedFile = null"
                :max-file-size="2 * 1024 * 1024"
                style="width: 350px"
                hide-upload-btn
              />
                
              <s-btn
              color="primary"
              label="Отправить"
              :disabled="!currentLockId || !selectedFile"
              @click="goUpload"
              class="mt-base-15 full-width"
              />
              
              <s-btn
              color="green"
              label="Скачать шаблон"
              @click="downloadPattern"
              class="mt-base-15 full-width"
              />
        </div>
        <div v-if="visibleUpload">
            <SBtn
                label="Вернуться назад"
                width="base-xxxl"
                @click="visibleUpload  = false"
                class="mt-base-15" />
        </div>
        <div v-if="!visibleUpload && !visibleCreateDialog">

            <s-select-backend
                v-model="filterParams.lock_id_filter"
                option-label="title"
                option-value="id"
                label="Поиск по устройству"
                class="mt-base-15 "
                :getter="getLocks"
                no-data-label="Нет устройств"
                @update:modelValue="fetch" />
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
                :disable="filterParams.lock_id_filter == null" />
        </div>
        <SBtn
            v-if='!visibleUpload'
            :label="visibleCreateDialog ? 'Вернуться':'Добавить RFID'"
            width="base-xxxl"
            @click="visibleCreateDialog = !visibleCreateDialog"
            class="mt-base-15" />
        <nfc-create-dialog v-if="visibleCreateDialog" :create-row="createRequest" />

    </div>
    <div :class="isMobile ? 'home_wrapper_1':'home_wrapper_3'">
        <div class="mt-base-25">
            <q-table
                class="s-table--wrapper bordered "
                table-class="s-table"
                dense
                flat
                :rows="list"
                :columns="filteredColumns"
                :no-data-label="TABLE_SETTINGS.NO_DATA_LABEL"
                :no-results-label="TABLE_SETTINGS.NO_RESULTS_LABEL"
                :rows-per-page-options="TABLE_SETTINGS.ROWS_PER_PAGE_LIST"
                :rows-per-page-label="TABLE_SETTINGS.ROWS_PER_PAGE_LABEL"
                hide-bottom>
                <template v-slot:body="props">
                    <q-tr :props="props" @click="visibleTooltip = props.row.id">

                        <q-td
                            key="indicators"
                            :props="props"
                            class="fw-700">

                            <div v-if="(props.row.local || props.row.phone.local) ">
                                <span v-if="props.row.local">
                                    <q-btn
                                        dense
                                        flat
                                        round
                                        icon="lens"
                                        size="10.5px"
                                        color="orange"
                                        @click= "orangeLabel = !orangeLabel"
                                        >
                                        <q-tooltip
                                            anchor="center right"
                                            self="center middle"
                                            :offset="[-200, 200]"
                                            :delay="400">
                                            <div class="flex">
                                                <div class="orange-info "></div>
                                            <div>&nbsp; Доступ выдан на локальном сервере</div>
                                            </div>
                                        </q-tooltip>
                                    </q-btn>
                                    <div  class="tooltip-down" v-if="orangeLabel && isMobile">
                                       <div class="flex justify-between">
                                        <div class="orange-info "></div>
                                        <q-btn flat icon="close" @click="orangeLabel = false"></q-btn>
                                        <div>&nbsp; Доступ выдан на локальном сервере</div>
                                       </div>
                                </div>
                                </span>
                                <span v-if="!props.row.local">
                                    <q-btn
                                        dense
                                        flat
                                        round
                                        icon="lens"
                                        size="10.5px"
                                        color="red"
                                        @click="redLabel = !redLabel"
                                        >
                                        <q-tooltip
                                            anchor="center right"
                                            self="center middle"
                                            :offset="[-200, 200]"
                                            :delay="400">
                                            <div class="flex">
                                                <div class="red-info"></div>
                                                <div>
                                                    &nbsp; Пользователь не зарегистрирован<br> на stown.ooo
                                                </div>
                                            </div>
                                        </q-tooltip>
                                    </q-btn>
                                    <div  class="tooltip-down" v-if="redLabel && isMobile">
                                       <div class="flex justify-between">
                                        <div class="red-info "></div>
                                        <q-btn flat icon="close" @click="redLabel = false"></q-btn>
                                        <div> Пользователь не зарегистрирован<br> на stown.ooo</div>
                                       </div>
                                </div>
                                </span>
                            </div>
                        </q-td>
                        <q-td
                            key="phone"
                            :props="props"
                            class="fw-700">

                            <span>{{ props.row.phone ? props.row.phone.phone: 'Отсутствует'  }}</span>
                        </q-td>

                        <q-td key="key" :props="props">
                            {{ props.row.key  ? props.row.key: 'Отсутствует' }}
                        </q-td>
                        <q-td
                            key="comment"
                            :props="props"
                            v-if="!isMobile">
                            {{ props.row.comment ?  props.row.comment : 'Отсутствует'  }}
                        </q-td>
                        <q-td key="action" :props="props">
                            <q-btn
                                variant=""
                                icon="more_vert"
                                dense
                                flat>
                                <q-menu>
                                    <q-list>
                                        <q-item
                                            v-close-popup
                                            clickable
                                            dense
                                            @click='openSetting(props.row)'>
                                            <q-item-section>Открыть</q-item-section>
                                        </q-item>
                                        <q-item
                                            v-close-popup
                                            clickable
                                            dense
                                            @click="onViewConfirmationDialog(props.row)">
                                            <q-item-section class="text-red-base-1">Удалить</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>

            </q-table>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                    v-model="paginationParams.page"
                    :max="paginationParams.pages"
                    :max-pages="5"
                    :boundary-numbers="false"
                    @update:model-value="fetch"
                    direction-links />
            </div>
            <nfc-dialog v-model="visibleDialog" :rfid-data="rfidCurrent" />
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
import {
    API_SERVER
} from 'src/constants/common';
import {
    defineComponent,
    onMounted,
    ref,
    computed
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
            currentLockId,
            isMobile,
            selectedFile,
            uploader,
            selectedFileF,
            downloadPattern
        } = useList();

        const orangeLabel = ref(false);
        const redLabel = ref(false);
        const visibleCreateDialog = ref(false);
        const createRequest = (NewDataPromise) => {
            console.log(NewDataPromise);
            NewDataPromise.then((NewRfid) => {
                if (NewRfid == undefined) {
                    // visibleCreateDialog.value = true;
                    return
                } else {
                    // console.log(NewService);
                    list.value.unshift(NewRfid);
                }
            }).catch((error) => {
                console.error('Error while processing NewDataPromise:', error);
            });
        }

        const filteredColumns = computed(() => {
            return !isMobile.value ?
                TABLE_COLUMNS :
                TABLE_COLUMNS.filter(column => column.name !== 'comment');
        });
        const visibleTooltip = ref(null);
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
            currentLockId,
            visibleTooltip,
            filteredColumns,
            selectedFile,
            uploader,
            selectedFileF,
            downloadPattern,
            orangeLabel,
            redLabel
        };
    },
});
</script>
