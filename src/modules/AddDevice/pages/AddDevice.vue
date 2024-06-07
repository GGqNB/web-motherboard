<template>
<s-page v-if="listLocks">
    <s-header :create-btn="false" 
    title="Добавление нового устройства" />
    <div class="home_wrapper">
        <div class="fs-8 mt-base-40">
            Ваши устройства :
        </div>
        <div v-for="i in listLocks" :key="i.id">
            <div v-if="i.title" class="flex justify-between mt-base-20">
                <div>
                    {{ i.id }}.
                    {{ i.title }}
                    <br>
                    Адрес :
                    {{ i.address }}
                </div>
                <div>
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
        <SBtn label="Добавить" :disable="btnFlag" width="base-xxxl" @click=createLock() class="mt-base-15" />
        <SBtn label="Обновить" :disable="!btnFlag" width="base-xxxl" @click=searchNewDevice() class="mt-base-15"/>
    </div>
    <div class="main_footer">
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
import {
    useMeta
} from 'quasar';

export default defineComponent({
    name: 'AddDevicePage',
    components: {
        // SInput
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
            
        } = useList();
        // onMounted(() => useMeta($route.meta));
        onMounted(() => init());
        // eslint-disable-next-line no-return-assign

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
            searchNewDevice
        };
    },
});
</script>
