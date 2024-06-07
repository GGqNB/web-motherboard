
export type MenuItem = {
  id: number;
  ordinalNum: number;
  index: string | number;
  title: string;
  routeName: string;
  icon: string | null;
  children: Array<MenuItem> | [];
  permission?: (user: any) => boolean;
};

// const userCanAny = (...args: Array<string | Array<string>>) => (user: UserInfo) => {
//   const flatPermissions = flatten(args);
//   const permitted = hasPermission(flatPermissions, false, user);
//   if (!permitted) {
//     console.warn(`${user.email} failed permission check(any) for [${flatPermissions}]`);
//   }

//   return permitted;
// };

const menuItemsList: Array<MenuItem> = [
  {
    id: 1,
    ordinalNum: 1,
    title: 'Добавление номера телефона',
    routeName: 'add_number',
    index: '1',
    icon: 'add_call',
    children: [],
    // permission: userCanAny(permissionSet.service.list),
  },
  {
    id: 2,
    ordinalNum: 2,
    title: 'Добавление нового устройства',
    routeName: 'add_device',
    index: '2',
    icon: 'add_box',
    children: [],
    // permission: userCanAny(permissionSet.service.list),
  },
  {
    id: 3,
    ordinalNum: 3,
    title: 'Настройки устройства',
    routeName: 'setting_device',
    index: '3',
    icon: 'tune',
    children: [],
    // permission: userCanAny(permissionSet.service.list),
  },
  {
    id: 4,
    ordinalNum: 4,
    title: 'RFID Метки',
    routeName: 'nfc-keys',
    index: '4',
    icon: 'tune',
    children: [],
    // permission: userCanAny(permissionSet.service.list),
  },
  // {
  //   id: 1,
  //   ordinalNum: 1,
  //   title: 'Клиенты',
  //   routeName: 'clients',
  //   index: '1',
  //   icon: 'las la-user-friends',
  //   children: [],
  //   // permission: userCanAny(permissionSet.service.list),
  // },
  // {
  //   id: 2,
  //   ordinalNum: 2,
  //   title: 'Расписание',
  //   routeName: '',
  //   index: '2',
  //   icon: 'las la-calendar',
  //   children: [
  //     {
  //       id: 21,
  //       ordinalNum: 21,
  //       title: 'Единая сетка расписания',
  //       routeName: 'schedules',
  //       index: '21',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 22,
  //       ordinalNum: 22,
  //       title: 'Персональные занятия',
  //       routeName: 'personal-activities',
  //       index: '22',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 23,
  //       ordinalNum: 23,
  //       title: 'Групповые занятия',
  //       routeName: 'group-activities',
  //       index: '23',
  //       icon: null,
  //       children: [],
  //     }
  //   ],
  // },
  // {
  //   id: 3,
  //   ordinalNum: 3,
  //   title: 'Администрирование',
  //   routeName: '',
  //   index: '3',
  //   icon: 'las la-user-shield',
  //   children: [
  //     {
  //       id: 31,
  //       ordinalNum: 31,
  //       title: 'Сотрудники',
  //       routeName: 'staff',
  //       index: '31',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 32,
  //       ordinalNum: 32,
  //       title: 'Роли',
  //       routeName: 'roles',
  //       index: '32',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 33,
  //       ordinalNum: 33,
  //       title: 'Разрешения',
  //       routeName: 'permissions',
  //       index: '33',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 34,
  //       ordinalNum: 34,
  //       title: 'Организации/Филлиалы',
  //       routeName: 'organization',
  //       index: '34',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 35,
  //       ordinalNum: 35,
  //       title: 'Локации',
  //       routeName: 'locations',
  //       index: '35',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 36,
  //       ordinalNum: 36,
  //       title: 'Помещения (залы)',
  //       routeName: 'rooms',
  //       index: '36',
  //       icon: null,
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   ordinalNum: 4,
  //   title: 'Настройки занятий',
  //   routeName: '',
  //   index: '4',
  //   icon: 'las la-cog',
  //   children: [
  //     {
  //       id: 41,
  //       ordinalNum: 41,
  //       title: 'Направления занятий/тренировок',
  //       routeName: 'activity-directions',
  //       index: '41',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 42,
  //       ordinalNum: 42,
  //       title: 'Курсы занятий/тренировок',
  //       routeName: 'activity-courses',
  //       index: '42',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 43,
  //       ordinalNum: 43,
  //       title: 'Шаблоны групп занятий/тренировок',
  //       routeName: 'activity-group-template',
  //       index: '43',
  //       icon: null,
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   ordinalNum: 5,
  //   title: 'Справочники',
  //   routeName: '',
  //   index: '5',
  //   icon: 'las la-book-open',
  //   children: [
  //     {
  //       id: 51,
  //       ordinalNum: 51,
  //       title: 'Уровни подготовки',
  //       routeName: 'level-preparations',
  //       index: '51',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 52,
  //       ordinalNum: 52,
  //       title: 'Возрастные группы (категории)',
  //       routeName: 'age-categories',
  //       index: '52',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 53,
  //       ordinalNum: 53,
  //       title: 'Налоговые ставки',
  //       routeName: 'tax-rates',
  //       index: '53',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 54,
  //       ordinalNum: 54,
  //       title: 'Системы налогооблажения',
  //       routeName: 'tax-types',
  //       index: '54',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 55,
  //       ordinalNum: 55,
  //       title: 'Социальные сети',
  //       routeName: 'social-networks',
  //       index: '55',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 56,
  //       ordinalNum: 56,
  //       title: 'Районы и города',
  //       routeName: 'addresses',
  //       index: '56',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 57,
  //       ordinalNum: 57,
  //       title: 'Типы номенклатуры',
  //       routeName: 'nomenclature-types',
  //       index: '57',
  //       icon: null,
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   ordinalNum: 6,
  //   title: 'Номенклатура',
  //   routeName: '',
  //   index: '6',
  //   icon: 'las la-clipboard-list',
  //   children: [
  //     {
  //       id: 61,
  //       ordinalNum: 61,
  //       title: 'Группы номенклатуры',
  //       routeName: 'nomenclature-groups',
  //       index: '61',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 62,
  //       ordinalNum: 62,
  //       title: 'Подгруппы номенклатуры',
  //       routeName: 'nomenclature-subgroups',
  //       index: '62',
  //       icon: null,
  //       children: [],
  //     },
  //     {
  //       id: 63,
  //       ordinalNum: 63,
  //       title: 'Номенклатуры',
  //       routeName: 'nomenclatures',
  //       index: '63',
  //       icon: null,
  //       children: [],
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   ordinalNum: 7,
  //   title: 'Финансы',
  //   routeName: 'finances',
  //   index: '7',
  //   icon: 'las la-money-bill',
  //   children: []
  // },
  // {
  //   id: 8,
  //   ordinalNum: 8,
  //   title: 'Отчеты',
  //   routeName: 'reports',
  //   index: '8',
  //   icon: 'las la-file-alt',
  //   children: []
  // },
];

export default menuItemsList;
