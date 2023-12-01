import { RouteRecordRaw } from 'vue-router';

const AddPhonePage= () => import(
  /* webpackChunkName: "ActivityDirectionList" */ 'src/modules/AddPhone/pages/AddPhone.vue'
);
const SettingDevicePage= () => import(
  /* webpackChunkName: "ActivityDirectionList" */ 'src/modules/SettingsDevice/pages/SettingDevice.vue'
);

const AddDevicePage = () => import('src/modules/AddDevice/pages/AddDevice.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: AddPhonePage, name : 'add_number' }],
  },
  {
    path: '/setting_device',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: SettingDevicePage, name : 'setting_device' }],
  },
  {
    path: '/add_device',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: AddDevicePage, name : 'add_device' }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
