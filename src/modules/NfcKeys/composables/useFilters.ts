import { ref } from 'vue';
import {
  AbstractQueryParams,
  NullableQueryNumber,
  QueryString,
} from 'src/composables/useQueryString';

export type Filters = {
  phone_filter: string | null;
  lock_id_filter : number | null;
};

export function useServiceFilters() {
  const defaultFilterParams = (): Filters => ({
    phone_filter: null,
    lock_id_filter: null
  });

  const filterParams = ref<Filters>(defaultFilterParams());

  const sanitizeQueryFilterParams = (): AbstractQueryParams => ({
    phone_filter: QueryString,
    lock_id_filter: QueryString
  });

  return {
    filterParams,
    defaultFilterParams,
    sanitizeQueryFilterParams,
  };
}
