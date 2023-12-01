/**
 * Получить уникальные значения массива
 * @param array массив
 */
export const getUniqueArray = (array: Array<any>): Array<any> => [...new Set(array)];

/**
 * Создать диапазон чисел
 *
 * @param start
 * @param end
 * @returns
 */
export const rangeNumbers = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

/**
 * Определить пересечение массивов
 *
 * arrA = 1,3,4,5
 * arrB = 1,2,5,6,7
 *
 * result = 1,5
 *
 * @param arrA
 * @param arrB
 * @returns
 */
export const intersection = (arrA: Array<any>, arrB: Array<any>): Array<any> =>
  arrA.filter((x) => arrB.includes(x));

/**
 * Разность массивов
 *
 * arrA = 1,3,4,5
 * arrB = 1,2,5,6,7
 *
 * result = 3,4
 *
 * @param arrA
 * @param arrB
 * @returns
 */
export const difference = (arrA: Array<any>, arrB: Array<any>): Array<any> =>
  arrA.filter((x) => !arrB.includes(x));

/**
 * Симметричная разность массивов
 *
 * arrA = 1,3,4,5
 * arrB = 1,2,5,6,7
 *
 * result = 2,3,4,6,7
 *
 * @param arrA
 * @param arrB
 * @returns
 */
export const symmetricDifference = (arrA: Array<any>, arrB: Array<any>): Array<any> =>
  arrA.filter((x) => !arrB.includes(x)).concat(arrB.filter((x) => !arrA.includes(x)));

/**
 * Объединение
 *
 * arrA = 1,3,4,5
 * arrB = 1,2,5,6,7
 *
 * result = [1,2,3,4,5,6,7].
 *
 * @param arrA
 * @param arrB
 * @returns
 */
export const union = (arrA: Array<any>, arrB: Array<any>): Array<any> => [...arrA, ...arrB];
