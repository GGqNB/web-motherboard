import { ref } from 'vue';
import {
  AbstractQueryParams,
  NullableQueryNumber,
  QueryString,
} from 'src/composables/useQueryString';

export type Filters = {
  name_filter: string | null;
};

export function useServiceFilters() {
  const defaultFilterParams = (): Filters => ({
    name_filter: null,
  });

  const filterParams = ref<Filters>(defaultFilterParams());

  const sanitizeQueryFilterParams = (): AbstractQueryParams => ({
    filter: QueryString,
    departmentId: NullableQueryNumber,
  });

  return {
    filterParams,
    defaultFilterParams,
    sanitizeQueryFilterParams,
  };
}
