<template>
  <s-page>
    
    <s-header
      :create-btn="false"
      title="Привязка номера телефона"
    />
    <div class="home_wrapper" v-if="!phone_flag">
    
      <div class="mt-base-35">Номер для использования одноплатника</div>
      <SInput 
      label="Введите номер телефона" 
      class="mt-base-5" 
      v-model="userData.username"
      mask="+7 (###) ###-##-##"
      unmasked-value
      />
      <SInput 
      label="Введите пароль" 
      class="mt-base-15" 
      v-model="userData.password"
      type="password"
      />
      <SBtn label="Сохранить" width="base-xxxl" class="mt-base-15" :disable="phoneConnect" @click="addPhone()"/>
    </div>
    <div class="home_wrapper" v-if="phone_flag">
    <div class="mt-base-35">Номер для использования одноплатника</div>
    <SBtn label="Использовать другой номер" width="base-xxxl" class="mt-base-15" @click="phone_flag = !phone_flag"/>
  </div>
    <div class="home_wrapper">
     
      <div class="mt-base-15">Подключение wi-fi сети</div>
      <SSelect
      v-model="wifiData.ssid"
      :options="formattedWifiList"
      label="Выберите сеть wi-fi"
      emit-value
      map-options
      />
   

      <SInput label="Введите пароль" class="mt-base-15" v-model="wifiData.password"/>
      <SBtn label="Подключить" width="base-xxxl" class="mt-base-15" @click =wifiConnect() />
    </div>
  </s-page>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
// import SInput from 'src/components/ui/Input.vue';
import { useList } from '../composables/useAddPhone';
import { useMeta } from 'quasar';


export default defineComponent({
  name: 'AddPhonePage',
  components: {
  },
  setup() {
    const {
    $route ,
    listWifi,
    init,
    selectedWifi,
    wifiConnect,
    addPhone,
    wifi_flag,
    phone_flag,
    wifiData,
    userData,
    phoneConnect,
    wifiPassword,
  } = useList();

  const formattedWifiList = computed(() => {
    return listWifi.value.map((wifi) => ({ label: wifi.ssid, value: wifi.ssid }));
  });
  
  // const handleInput = (value) => {
  //   // Убираем маску перед сохранением в переменную phone
  //   phoneData.value.phone = value.replace(/\D/g, '');
  // };
  onMounted(() => useMeta($route.meta));
  onMounted(() => init());
    // eslint-disable-next-line no-return-assign
    // mask=" +7 (###) ###-##-##"

    return {
    listWifi,
    wifiPassword,
    init,
    selectedWifi,
    wifiConnect,
    phoneConnect,
    formattedWifiList,
    wifi_flag,
    phone_flag,
    wifiData,
    userData,
    addPhone,
    
    };
  },
});
</script>
