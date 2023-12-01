<template>
    <s-page>
      <s-header
        :create-btn="false"
        title="Настройки устройства"
      />
      <div class="home_wrapper">
        <SSelect label="Выберите устройство" class="mt-base-40 " v-model="selectedWifi" :options="wifi_data">
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label>{{ opt => Object(opt) === opt && 'name' in opt ? opt.name : 'Выберете город' }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
      </SSelect>
        
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SInput label="Время 1" icon="home" :readonly="true">
          <template v-slot:append>
          <q-btn round dense flat icon="tune" />
        </template>
          </SInput>
        <div class="s-input-settings ml-base-2">
        <SInput label="5сек"/>
      </div>
      </div>
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SInput label="Время 2" icon="home" :readonly="true">
          <template v-slot:append>
          <q-btn round dense flat icon="tune" />
        </template>
          </SInput>
        <div class="s-input-settings ml-base-2">
        <SInput label="5сек"/>
      </div>
      </div>
      <SBtn label="Сохранить" width="base-xxxl" class="mt-base-15" @click =onSubmit() />
      </div>
    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  // import SInput from 'src/components/ui/Input.vue';
  import { useNotifications } from 'src/composables/useNotifications';
  
  
  export default defineComponent({
    name: 'SettingDevicePage',
    components: {
      // SInput
    },
    setup() {
      const notification = useNotifications();

      const onSubmit = () => {
        notification.successNotification('Успешно сохранено');
      }
      const selectedWifi = ref(null);
      const wifi_data = [
        {
          id:3,
          name: 'Сеть 1',
        },
        {
          id:4,
          name: 'Сеть 2',
        },
        {
          id:5,
          name: 'Сеть 3',
        },
      ]
  
      // eslint-disable-next-line no-return-assign

  
      return {
        wifi_data,
        selectedWifi,
        model: ref([]),
        onSubmit,
      };
    },
  });
  </script>
  