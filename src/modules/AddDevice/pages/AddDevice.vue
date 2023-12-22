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
        <div v-for="i in listLocks" :key="i.id"  >
          <div  v-if="i.address != '0x0001'" class="flex justify-between mt-base-20">
            <div>
              {{ i.id }}.
              {{ i.title }}
              Адрес : 
              {{ i.address }}
            </div>
        <div>
        <q-btn dense flat round icon="lens" size="12.5px" color="green" />
        </div></div>
        

      </div>
  
        
      </div>
      <div class="home_wrapper">
      <div class="flex mt-base-15" >
        <SBtn label="Проверка нового устройства" @click = "searchDevice" width="base-xxxl" class="mt-base-15" />
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
        <div v-if="newDevice" class="mt-base-15">
        Новое устройство типа : {{ newDevice.lock_type.id == 1 ? 'Дверной замок' : 'Постамат'}}
        </div>
        <SInput label="Введите название" class="mt-base-15" v-model="lockData.title"/>
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
      searchDevice,
      newDevice,
      lockData,
      } = useList();
     
      onMounted(() => init());
      // eslint-disable-next-line no-return-assign

  
      return {
      listLocks,
      init,
      newDevice,
      createLock,
      lockData,
      searchDevice,
      };
    },
  });
  </script>
  