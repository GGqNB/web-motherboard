import { Notify } from 'quasar';

export type NotificationParamsType = {
  message?: string;
  color?: string;
  type?: string;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center';
  textColor?: string;
  timeout?: number;
  actions?: any[];
};

export type NotificationTypes = {
  failureNotification: (message?: string, additionalParameters?: NotificationParamsType) => void;
  warningNotification: (message?: string, additionalParameters?: NotificationParamsType) => void;
  successNotification: (message?: string, additionalParameters?: NotificationParamsType) => void;
  infoNotification: (message?: string, additionalParameters?: NotificationParamsType) => void;
};

export function useNotifications(): NotificationTypes {
  // const $q = useQuasar();

  const callNotification = (message: string, additionalParameters: NotificationParamsType = {}) => {
    const quasarNotifyConfig: NotificationParamsType = {
      ...{
        message,
        color: 'green-6',
        position: 'top-right',
        textColor: 'white',
        timeout: 2500,
        actions: [{ icon: 'close', color: 'white' }],
      },
      ...additionalParameters,
    };
    Notify.create(quasarNotifyConfig);
  };

  function successNotification(
    message = 'Данные успешно сохранены',
    additionalParams: NotificationParamsType = {}
  ) {
    callNotification(message, { color: 'green-6', type: 'positive', ...additionalParams });
  }

  function warningNotification(
    message = 'Произошла ошибка!',
    additionalParams: NotificationParamsType = {}
  ) {
    callNotification(message, { color: 'orange-6', type: 'warning', ...additionalParams });
  }

  function failureNotification(
    message = 'При сохранении произошла ошибка!',
    additionalParams: NotificationParamsType = {}
  ) {
    callNotification(message, { color: 'red-6', type: 'negative', ...additionalParams });
  }

  function infoNotification(
    message = 'Добро пожаловать!',
    additionalParams: NotificationParamsType = {}
  ) {
    callNotification(message, { color: 'blue-6', type: 'info', ...additionalParams });
  }

  return {
    failureNotification,
    warningNotification,
    successNotification,
    infoNotification,
  };
}
