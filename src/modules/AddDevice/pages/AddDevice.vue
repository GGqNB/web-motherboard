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
        <div v-for="i in listLocks" :key="i.id" class="flex justify-between mt-base-20">
        <div>
          {{ i.id }}.
          {{ i.name }}
          Адрес : 
          {{ i.address }}
        </div>
        <div>
        <q-btn dense flat round icon="lens" size="12.5px" color="green" />
        </div>

      </div>
  
        
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SBtn label="Проверка нового устройства" width="base-xxxl" class="mt-base-15" />
        <SBtn 
        label="Развернуть инструкцию по проверке" 
        width="base-xxxl" 
        class="mt-base-15" 

        disable
        ><q-tooltip
          
          anchor="bottom middle" self="center middle"
          :offset="[20, 80]"
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
        <SInput label="Введите название" class="mt-base-15" v-model="lockData.name"/>
        <SInput label="Введите сетевой адрес" class="mt-base-15"  v-model="lockData.address">
          <q-tooltip
          
          anchor="bottom middle" self="center middle"
          :offset="[20, 80]"
          :delay="400"
        >
        <div class="mt-base-15"> Сетевой адресс имеет формат 0xYYYY</div>
        <div>Например: 0x0001,0x0002,0x0003,0x0004</div>
        </q-tooltip>
        </SInput>
        <SBtn label="Добавить" width="base-xxxl" @click=createLock() class="mt-base-15"/>
      </div>
      <div class="main_footer">
      </div>
    </s-page>
  </template>
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useList } from '../composables/useAddDevice';
  
  
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
      lockData,
      } = useList();
  
      onMounted(() => init());
      // eslint-disable-next-line no-return-assign

  
      return {
      listLocks,
      init,
      createLock,
      lockData,
      };
    },
  });
  </script>
  