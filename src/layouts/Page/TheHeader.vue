<template>
  <q-header id="" reveal class="bg-grey-10">
    <q-toolbar class="s-header--toolbar">
      <div class="row items-center s-header">
        <q-btn class="s-header-menu" clickable flat no-wrap dense @click="changeVisibilitySidebar">
          <q-icon name="menu" />
        </q-btn>
        <router-link :to="{ name: routerMainPageName }">
          <!-- TODO: Лого нужно, лого нет -->
          <img class="s-header-logo q-ml-xl" src="src/assets/img/images/logo-no-text.png" alt="Логотип системы">
        </router-link>
      </div>
      <q-space /> 
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useAppStore } from 'stores/app.store';
import {  defineComponent, } from 'vue';
import { storeToRefs } from 'pinia';
import { routerMainPageName, loginPageName } from 'src/router/router.constants';
import { useRouter } from 'vue-router';
// import { HeaderProfileLink } from 'SharedComponents/header/profile.d';
// import { useLocalAuthStore } from 'AdminDir/stores/auth.store';
// import { useUserStore } from 'AdminDir/stores/user.store';
// import HeaderOrganization from 'src/components/header/HeaderOrganization.vue';
// import HeaderProfile from 'SharedComponents/header/Profile.vue';

export default defineComponent({
  name: 'TheHeader',
  components: {
  },
  setup() {
    const router = useRouter();

    const appStore = useAppStore();
    // const authStore = useLocalAuthStore();
    // const userStore = useUserStore();

    const { collapseSidebar } = storeToRefs(appStore);

    const changeVisibilitySidebar = () => {
      appStore.setCollapseSidebar(!collapseSidebar.value);
    };

    // const linkListProfile: HeaderProfileLink[] = [
    //   { icon: 'las la-bars', name: 'Профиль пользователя', route: 'services' },
    //   { icon: 'phone', name: 'Мои заявления', route: 'services' },
    //   { icon: 'person', name: 'Уведомления', route: 'services' },
    //   { icon: 'person', name: 'Написать в поддержку', route: 'ui-kit' },
    //   { icon: 'person', name: 'Выйти из системы', route: 'exit' },
    // ];

    // const profileLabel = computed(() => userStore.fio);

    // const profileRole = computed(() => userStore.roleName);

    function routeTo(routeName) {
      if (routeName === 'exit') {
       
        router.push({ name: loginPageName });
      } else {
        router.push({ name: routeName });
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore

    return {
      routerMainPageName,
      changeVisibilitySidebar,
      routeTo,
    };
  },
});
</script>
