/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Filters } from '../filters';

export namespace StoreFlag {
  /**
  /**
  * Декларация модуля приложения
  */
  export interface AppStateInterface {
    collapseSidebar: boolean;
  }

  /**
  * Декларация модуля авторизации
  */
  export interface AuthStateInterface {
    accessToken: null | string;
    refreshToken: null | string;
  }

  /**
   * Декларация модуля пользователя
   */
  export interface UserStateInterface {
    user: null | Administration.SystemUser;
  }

  export interface StateInterface {
    app: AppStateInterface;
    auth: AuthStateInterface;
    user: UserStateInterface;
  }

  export interface FiltersStateInterface {
    usersFilter: Filters.UsersFilterParams;
    logsFilter: Filters.LogsFilterParams;

    rolesFilter: Filters.RolesFilterParams;
    citiesFilter: Filters.CitiesFilterParams;
    locationsFilter: Filters.LocationsFilterParams;
    roomsFilter: Filters.RoomsFilterParams;
    profilesFilter: Filters.ProfilesFilterParams;
    taxRatesFilter: Filters.TaxRatesFilterParams;
    taxTypesFilter: Filters.TaxTypesFilterParams;
    paymentSystemsFilter: Filters.PaymentSystemsFilterParams;
    organizationsFilter: Filters.OrganizationsFilterParams;
    nomenclatureTypesFilter: Filters.NomenclatureTypesFilterParams;
    nomenclatureGroupsFilter: Filters.NomenclatureGroupsFilterParams;
    nomenclaturesFilter: Filters.NomenclaturesFilterParams;
    activityDirectionsFilter: Filters.ActivityDirectionsFilterParams;
    activityTypesFilter: Filters.ActivityTypesFilterParams;
    activityGroupTemplatesFilter: Filters.ActivityGroupTemplatesFilterParams;
    activityTempatesFilter: Filters.ActivityTemplatesFilterParams;
    nomenclatureLocationsFilter: Filters.NomenclatureLocationsFilterParams;
    nomenclatureActivitiesFilter : Filters.NomenclatureActivitiesFilterParams;
    nomenclatureSubgroupFilter : Filters.NomenclatureSubgroupFilterParams;
    nomenclatureActivationsFilter : Filters.NomenclatureActivationsFilterParams;
    regionsFilter : Filters.RegionsFilterParams;
    activityCoursesFilter: Filters.ActivityCoursesFilterParams;
    activityKindsFilter: Filters.ActivityKindsFilterParams;

    nomenclatureProfilesFilter: Filters.NomenclatureProfilesFilterParams;
    nomenclatureProfileHistoryStatusesFilter: Filters.NomenclatureProfileHistoryStatusesFilterParams;
    nomenclatureStatusesFilter: Filters.NomenclatureStatusesFilterParams;
    activityStatesFilter: Filters.ActivityStatesFilterParams;
    activityGroupTrainersFilter: Filters.ActivityGroupTrainersFilterParams;
    activityGroupProfilesFilter: Filters.ActivityGroupProfilesFilterParams;
    activityGroupSchedulesFilter: Filters.ActivityGroupSchedulesFilterParams;
    activitiesFilter: Filters.ActivitiesFilterParams;
    ageCategoriesFilter: Filters.AgeCategoriesFilterParams;
    levelPreparationsFilter:Filters.LevelPreparationsFilterParams;
    activityGroupsFilter: Filters.ActivityGroupsFilterParams;

  }
  export interface PaginationsStateInterface {
    usersPagination: Filters.Pagination;
    logsPagination: Filters.Pagination;

    rolesPagination: Filters.Pagination;
    citiesPagination: Filters.Pagination;
    locationsPagination: Filters.Pagination;
    roomsPagination: Filters.Pagination;
    profilesPagination: Filters.Pagination;
    taxRatesPagination: Filters.Pagination;
    taxTypesPagination: Filters.Pagination;
    paymentSystemsPagination: Filters.Pagination;
    organizationsPagination: Filters.Pagination;
    nomenclatureTypesPagination: Filters.Pagination;
    nomenclatureGroupsPagination: Filters.Pagination;
    nomenclaturesPagination: Filters.Pagination;
    activityDirectionsPagination: Filters.Pagination;
    activityTypesPagination: Filters.Pagination;
    activityGroupTemplatesPagination: Filters.Pagination;
    activityTempatesPagination: Filters.Pagination;
    nomenclatureLocationsPagination: Filters.Pagination;
    nomenclatureActivitiesPagination : Filters.Pagination;
    nomenclatureSubgroupPagination : Filters.Pagination;
    nomenclatureActivationsPagination : Filters.Pagination;
    activityCoursesPagination: Filters.Pagination;
    activityKindsPagination: Filters.Pagination;

    nomenclatureProfilesPagination: Filters.Pagination;
    nomenclatureProfileHistoryStatusesPagination: Filters.Pagination;
    nomenclatureStatusesPagination: Filters.Pagination;
    activityStatesPagination: Filters.Pagination;
    activityGroupTrainersPagination: Filters.Pagination;
    activityGroupProfilesPagination: Filters.Pagination;
    activityGroupSchedulesPagination: Filters.Pagination;
    activitiesPagination: Filters.Pagination;
    ageCategoriesPagination: Filters.Pagination;
    levelPreparationsPagination:Filters.Pagination;
    activityGroupsPagination: Filters.Pagination;

  }

}
