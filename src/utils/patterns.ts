
export const PHONE_NUMBER_PATTERN = /^((8|\+7|7)[\- ]?)((\(\s?)?(\d{4}|\d{2}\-\d{2})(\s?\))?[\- ]?(\d{3}[\- ]?\d{3}|(\d{2}[\- ]){2}?\d{2}|\d{4}[\-]?\d{2})|((\(\s?)?\d{3}(\s?\))?[\- ]?(\d{7}|\d{3}[\- ](\d{2}[\- ]\d{2}|\d{4}))))$/g;

export const EMAIL_PATTERN =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

/**
 * Паттерн для проверки городского номера с добавочным или без
 *
 * Примеры подходящих значений под маску:
 * 8 #### ######, 8 #### ###### (доб. ####), 8 #### ###### (####)
 * 8##########, 8########## (####), 8########## (доб. ####)
 * 8########## доб. ##, +7##########, 7##########,
 * +7 ### ### ## ##, 8(###)###-##-##
 *
 */
export const cityPhonePattern = /^((\(\s?)?(\d{4}|\d{2}\-\d{2})(\s?\))?[\- ]?(\d{3}[\- ]?\d{3}|(\d{2}[\- ]){2}?\d{2}|\d{4}[\-]?\d{2})|((\(\s?)?\d{3}(\s?\))?[\- ]?(\d{7}|\d{3}[\- ](\d{2}[\- ]\d{2}|\d{4}))))(\s\(?(\доб.\s)?\d{1,5}\)?)?$/g;
