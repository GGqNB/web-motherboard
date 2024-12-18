<template>
    <s-page>
      <s-header
        :create-btn="false"
        title="Настройки устройства"
      />
      <div class="home_wrapper">
        <s-select-backend
          v-model="lockData"
          option-label="title"
          :value-object="true"
          label="Выберите устройство"
          class="mt-base-25 "
          :getter="getLocks"
          search-filter="name_filter"
        />
        
        <div v-if="lockData.id !== 0" class="mt-base-15">
          <div v-if="lockFetchData.lock_type_id == 2">
            Это устройство - Постамат и у него нет настроек
          </div>
          <div v-if="lockFetchData.lock_type_id == 1">
             Время открытия и закрытия этого устройства составляет : {{ lockData.open_time / 10 }} сек
          </div>
          
          <div v-if="lockFetchData.lock_type_id == 3">
            Сейчас время открытия составляет : {{ lockData.open_time / 10 }} сек
            <div>Сейчас время закрытия составляет : {{ lockData.close_time /10 }} сек</div>
          </div>
        </div>
      </div>
    <div v-if="lockFetchData.lock_type_id !== 2">
      <div class="home_wrapper_2">
        <div class="mt-base-15 flex" >
          <SInput label="Время открытия" icon="home" :readonly="timeFlagUp" >
            <template v-slot:append>
            <q-btn round dense flat icon="tune" @click="timeFlagUp = !timeFlagUp"/>
          </template>
            </SInput>
          <div class="s-input-settings ml-base-2">
          <SInput 
            type="number"
            max-length="1" 
            label="секунд" 
            v-model="lockFetchData.open_time" />
        </div>
        </div>
        </div>
        <div class="home_wrapper">
        <div class="flex mt-base-15" v-if="lockFetchData.lock_type_id == 3">
          <SInput label="Время закрытия" icon="home" :readonly="timeFlagDown" >
            <template v-slot:append>
            <q-btn round dense flat icon="tune" @click="timeFlagDown = !timeFlagDown" />
          </template>
            </SInput>
          <div class="s-input-settings ml-base-2">
          <SInput
           type="number" 
           label="секунд"
            v-model="lockFetchData.close_time" />
        </div>
        </div>
        <SBtn label="Сохранить" width="base-xxxl" :disable="lockData.id == 0" class="mt-base-15"  @click="updateTimeLock"/>
        </div>
    </div>
    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  // import SInput from 'src/components/ui/Input.vue';
import { useList } from '../composables/useSettingDevice';
import SSelectBackend from 'src/components/backend/SSelectBackend.vue';
  
  
  export default defineComponent({
    name: 'SettingDevicePage',
    components: {
      SSelectBackend
    },
    setup() {
      const {
      listLocks,
      lockFetchData,
      updateTimeLock,
      lockData,
      getLocks,
      test,
      filterParams
      } = useList();
      

      const timeFlagUp = ref(true);
      const timeFlagDown = ref(true);
     
  
      // eslint-disable-next-line no-return-assign

  
      return {
        listLocks,
        updateTimeLock,
        lockFetchData,
        timeFlagUp,
        timeFlagDown,
        lockData,
        getLocks,
        test,
        filterParams
      };
    },
  });
  </script>
  