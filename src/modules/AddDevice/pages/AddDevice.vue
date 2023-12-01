<template>
    <s-page>
      <s-header
        :create-btn="false"
        title="Добавление нового устройства"
      />
      <!-- <div class="home_wrapper">
        <div class="flex justify-end mt-base-10">
          <q-btn dense flat round icon="lens" size="12.5px"  color="red" />
          <q-btn dense flat round icon="lens" size="12.5px" color="red" />
        </div>
      </div> -->
      <div class="home_wrapper">
        <div class="fs-8 mt-base-40">
            Ваши уже добавленные устройства :
        </div>
        <div class="flex justify-between mt-base-20">
        <div>
          1. №3221 Дом на Георгия-Величко 9
        </div>
        <div>
        <q-btn dense flat round icon="lens" size="12.5px" color="red" />
        </div>
        <!-- :color="(wifi_flag ? 'green' : 'red')" -->
      </div>
      <div class="flex justify-between">
        <div>
          2. №3222 Дом на Гагарина 121
        </div>
        <div>
        <q-btn dense flat round icon="lens" size="12.5px" color="red" />
        </div>
        <!-- :color="(wifi_flag ? 'green' : 'red')" -->
      </div>
        
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SBtn label="Проверка нового устройства" width="base-xxxl" class="mt-base-15" @click =onSubmit() />
        <SBtn 
        label="Развернуть инструкцию по проверке" 
        width="base-xxxl" 
        class="mt-base-15" 
        @click =onSubmit()
        disable
        ><q-tooltip
          
          anchor="bottom middle" self="center middle"
          :offset="[20, 0]"
          :delay="400"
        >
        <div class="mt-base-15"> Шаг 1: Подготовка</div>
        <div>Перед началом процесса подключения убедитесь, что у вас есть все необходимые компоненты.<br> Распакуйте устройство XYZ, кабели, и руководство пользователя.</div>
        <div class="mt-base-15"> Шаг 2: Подключение к Питанию</div>
        <div>Вставьте кабель питания в соответствующий разъем на устройстве XYZ. Подключите другой конец <br>к источнику питания, убедившись в том, что напряжение соответствует требованиям устройства.</div>
        <div class="mt-base-15"> Шаг 3: Подключение к Сети</div>
        <div>Используя предоставленный сетевой кабель, подключите устройство XYZ к сети интернет. Если устройство<br> имеет функцию беспроводного подключения, следуйте инструкциям в руководстве пользователя для настройки Wi-Fi.</div>
        </q-tooltip>
      </SBtn>
      
      </div>
      </div>
      <div class="home_wrapper ">
        <SInput label="Введите название" class="mt-base-15"/>
        <SInput label="Введите номер телефона" class="mt-base-15"/>
        <SBtn label="Добавить" width="base-xxxl" class="mt-base-15"/>
      </div>

    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useNotifications } from 'src/composables/useNotifications';
  
  
  export default defineComponent({
    name: 'AddDevicePage',
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
  