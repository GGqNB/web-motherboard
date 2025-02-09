<template>
<s-page v-if="listLocks">
    <s-header :create-btn="false" title="Добавление нового устройства" />
    <div class="home_wrapper">
        <div class="fs-8 mt-base-40">
            Ваши устройства :
        </div>
        <div v-for="lock in listLocks" :key="lock.id">
            <div v-if="lock.title" class="flex justify-between mt-base-20">
                <div>
                    {{ lock.id }}.
                    {{ lock.title }}
                    <div>
                        Адрес :
                        {{ lock.address }}
                    </div>
                </div>
                <div>
                   <q-btn flat icon="settings" @click="openSetting(lock)"/>
                </div>
            </div>
        </div>
        <div class="flex justify-center" v-if="paginationParams.pages > 1">
            <q-pagination
                v-model="paginationParams.page"
                :max="paginationParams.pages"
                :max-pages="5"
                :boundary-numbers="false"
                @update:model-value="fetch"
                direction-links
            />
        </div>
    </div>
    <div class="home_wrapper">
        <div class="fs-8 mt-base-40">
            Новые устройства :
        </div>
        <div>
            <div class="flex justify-between mt-base-20" v-if="newLock">
                <div>
                    {{ newLock.lock_type.id == 1 ? 'Дверной замок' : 'Постамат'}}
                    <br>
                    Адрес :
                    {{ newLock.address }}
                </div>
                <div>

                </div>
            </div>
        </div>

    </div>
    <div class="home_wrapper">
        <div class="flex mt-base-15">

        </div>
    </div>
    <div class="home_wrapper ">

        <SInput
            label="Введите название"
            class="mt-base-15"
            v-model="lockData.title"
        />
        <SBtn
            label="Добавить"
            :disable="lockData.title && btnFlag"
            width="base-xxxl"
            @click="visibleDialog = !visibleDialog"
            class="mt-base-15"
        />
        <!-- <SBtn
     label="Modal"
     width="base-xxxl"
     @click="visibleDialog = !visibleDialog"
     class="mt-base-15"
 /> -->
        <SBtn label="Обновить" :disable="!btnFlag" width="base-xxxl" @click=searchNewDevice() class="mt-base-15" />
    </div>
    <div class="main_footer">
        <add-device-dialog :show="visibleDialog" @send-lock="createLock" />
        <settings-device-dialog :lock-data="currentLock" v-model="visibleSetting"/>
    </div>
</s-page>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted
} from 'vue';
import {
    useList
} from '../composables/useAddDevice';
import AddDeviceDialog from '../components/AddDeviceDialog.vue';
import SettingsDeviceDialog from '../components/SettingsDeviceDialog.vue';
import {
    useMeta
} from 'quasar';

export default defineComponent({
    name: 'AddDevicePage',
    components: {
        // SInput
        AddDeviceDialog,
        SettingsDeviceDialog
    },
    setup() {
        const {
            listLocks,
            createLock,
            init,
            searchDevice,
            lockData,
            btnFlag,
            bindLocks,
            $route,
            shouldDisplayElement,
            foundFirstElement,
            newLock,
            paginationParams,
            fetch,
            searchNewDevice,
            visibleDialog,
            openSetting,
            visibleSetting,
            currentLock
        } = useList();

        onMounted(() => init());

        return {
            listLocks,
            init,
            btnFlag,
            createLock,
            lockData,
            bindLocks,
            searchDevice,
            shouldDisplayElement,
            newLock,
            foundFirstElement,
            paginationParams,
            fetch,
            searchNewDevice,
            visibleDialog,
            openSetting,
            visibleSetting,
            currentLock
        };
    },
});
</script>
