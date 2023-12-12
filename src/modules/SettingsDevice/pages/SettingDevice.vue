<template>
    <s-page>
      <s-header
        :create-btn="false"
        title="Настройки устройства"
      />
      <div class="home_wrapper">
        <SSelect label="Выберите устройство" v-model="lockData"  class="mt-base-40 " :options="listLocks" option-label="name">
      </SSelect>
        
      </div>
      <div class="home_wrapper mt-base-15">
        <div class=" mt-base-15">Привязка устройства {{ lockData.name }} по номеру</div>
        <SInput 
        v-model="phoneData.phone" 
        class=" mt-base-15" 
        label="Введите номер телефона" 
        :disable="lockData.id == 0 ?? true"
        mask="+7 (###) ###-##-##"
        unmasked-value
        />
        <SBtn 
        label="Привязать" 
        width="base-xxxl" 
        :disable="lockData.id == 0 ?? true" 
        class="mt-base-15" 
        @click="bindLock()"/>
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SInput label="Время 1" icon="home" :readonly="timeFlagUp">
          <template v-slot:append>
          <q-btn round dense flat icon="tune" @click="timeFlagUp = !timeFlagUp"/>
        </template>
          </SInput>
        <div class="s-input-settings ml-base-2">
        <SInput label="5сек"/>
      </div>
      </div>
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SInput label="Время 2" icon="home" :readonly="timeFlagDown">
          <template v-slot:append>
          <q-btn round dense flat icon="tune" @click="timeFlagDown = !timeFlagDown"/>
        </template>
          </SInput>
        <div class="s-input-settings ml-base-2">
        <SInput label="5сек"/>
      </div>
      </div>
      <SBtn label="Сохранить" width="base-xxxl" class="mt-base-15"  />
      </div>
    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  // import SInput from 'src/components/ui/Input.vue';
  import { useList } from '../composables/useSettingDevice';
  
  
  export default defineComponent({
    name: 'SettingDevicePage',
    components: {
      // SInput
    },
    setup() {
      const {
      listLocks,
      bindLock,
      phoneData,
      init,
      lockData,
      } = useList();
      
      onMounted(() => init());

      const timeFlagUp = ref(true);
      const timeFlagDown = ref(true);
     
  
      // eslint-disable-next-line no-return-assign

  
      return {
        listLocks,
        phoneData,
        init,
        bindLock,
        timeFlagUp,
        timeFlagDown,
        lockData,
      };
    },
  });
  </script>
  