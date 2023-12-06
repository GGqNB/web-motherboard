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
        <SSelect label="Выберите wi-fi сеть" class="mt-base-5" v-model="selectedWifi" :options="listWifi">
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
  import { defineComponent, onMounted, ref } from 'vue';
  // import SInput from 'src/components/ui/Input.vue';
  import { useList } from './useAddPhone';
  
  
  
  export default defineComponent({
    name: 'AddPhonePage',
    components: {
      // SInput
    },
    setup() {
      const {
        listWifi,
      init,
      selectedWifi,
      wifiConnect,
      addPhone,
      wifi_flag,
      phone_flag,
    } = useList();

    onMounted(() => init());
      // eslint-disable-next-line no-return-assign

  
      return {
      listWifi,
      init,
      selectedWifi,
      wifiConnect,
      wifi_flag,
      phone_flag,
      addPhone,
      };
    },
  });
  </script>
  