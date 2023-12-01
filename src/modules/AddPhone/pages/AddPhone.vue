<template>
    <s-page>
      <s-header
        :create-btn="false"
        title="Привязка номера телефона"
      />
      <div class="home_wrapper">
        <div class="flex justify-end mt-base-10">
          <q-btn dense flat round icon="lens" size="12.5px" :color="(wifi_flag ? 'green' : 'red')"> 
          <q-tooltip
          
          anchor="center right"
            self="center middle"
          :offset="[140, 0]"
          :delay="400"
        >
        <div class="mt-base-15">Статус WI-FI</div>
        <div>Красный цвет - нет соединения</div>
        <div>Ораньжевый цвет - нет соединения с сервером</div>
        <div>Зеленый цвет - есть соединение </div>
        </q-tooltip>
          </q-btn>
          <q-btn dense flat round icon="lens" size="12.5px" :color="(phone_flag ? 'green' : 'red')"><q-tooltip
          
            anchor="center right"
            self="center middle"
          :offset="[200, 0]"
          :delay="400"
        >
        <div class="mt-base-15">Статус привязки номера</div>
        <div>Красный цвет - ошибка сервера</div>
        <div>Ораньжевый цвет - Требуется регистрация на<br> сайте stown.ooo с указанным н.т</div>
        <div>Зеленый цвет - Этот сервер привязан к указанному номеру телефона </div>
        </q-tooltip></q-btn>
        </div>
        <div class="mt-base-10">Регистрация номера</div>
        <SInput label="Введите номер телефона" class="mt-base-5"/>
        <SBtn label="Сохранить" width="base-xxxl" class="mt-base-15" @click="addPhone()"/>
      </div>
      <div class="home_wrapper">
       
        <div class="mt-base-15">Подключение wi-fi сети</div>
        <SSelect label="Выберите wi-fi сеть" class="mt-base-5" v-model="selectedWifi" :options="wifi_data">
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
        
        <SInput label="Введите пароль" class="mt-base-15"/>
        <SBtn label="Подключить" width="base-xxxl" class="mt-base-15" @click =wifiConnect() />
      </div>
    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  // import SInput from 'src/components/ui/Input.vue';
  import { useNotifications } from 'src/composables/useNotifications';
  
  
  export default defineComponent({
    name: 'AddPhonePage',
    components: {
      // SInput
    },
    setup() {
      const wifi_flag = ref(false);
      let phone_flag = ref(false);
      const notification = useNotifications();
      const addPhone = () => {
        phone_flag.value = !phone_flag.value
        
        notification.successNotification('Телефон успешно добавлен');
      };
      const wifiConnect = () => {
        wifi_flag.value = !wifi_flag.value
        notification.successNotification('Успешное подключение');
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
        addPhone,
        wifi_flag,
        phone_flag,
        wifiConnect,
      };
    },
  });
  </script>
  