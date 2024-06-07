import { ref } from 'vue';
import {
  AbstractQueryParams,
  NullableQueryNumber,
  QueryString,
} from 'src/composables/useQueryString';

export type Filters = {
  filter: string | null;
  departmentId: number | null;
};

export function useServiceFilters() {
  const defaultFilterParams = (): Filters => ({
    filter: null,
    departmentId: null,
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
