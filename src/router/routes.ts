import { RouteRecordRaw } from 'vue-router';

const AddPhonePage= () => import(
  /* webpackChunkName: "ActivityDirectionList" */ 'src/modules/AddPhone/pages/AddPhone.vue'
);
const SettingDevicePage= () => import(
  /* webpackChunkName: "ActivityDirectionList" */ 'src/modules/SettingsDevice/pages/SettingDevice.vue'
);
const NFCPage = () => import('src/modules/NfcKeys/pages/List.vue')
const AddDevicePage = () => import('src/modules/AddDevice/pages/AddDevice.vue');
const LoginPage = () => import('src/modules/Authorization/Login.vue');
const MainLayout = () => import('src/layouts/MainLayout.vue');
const AuthLayout = () => import('src/layouts/AuthLayout.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: AddPhonePage, name : 'add_number' }],
    meta: {
      title: 'STOWN',
      authorization: true,
    }
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', component: LoginPage, name : 'login' }],
    meta: {
      title: 'STOWN',
      authorization: false,
    }
  },
  {
    path: '/setting_device',
    component: MainLayout,
    children: [{ path: '', component: SettingDevicePage, name : 'setting_device' }],
    meta: {
      title: 'STOWN',
      authorization: true,
    }
  },

  {
    path: '/add_device',
    component: MainLayout,
    children: [{ path: '', component: AddDevicePage, name : 'add_device' }],
    meta: {
      title: 'STOWN',
      authorization: true,
    }
  },
  {
    path: '/nfc-keys',
    component: MainLayout,
    children: [{ path: '', component: NFCPage, name : 'nfc-keys' }],
    meta: {
      title: 'STOWN',
      authorization: true,
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'STOWN',
      authorization: false
    }
  },
];

export default routes;
