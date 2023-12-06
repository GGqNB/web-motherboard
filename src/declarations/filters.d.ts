/* eslint-disable max-len */
export namespace Filters {
  export type FilterTypes =
    | 'users'
    | 'logs'
    | 'roles'
    | 'cities'
    | 'locations'
    | 'rooms'
    | 'profiles'
    | 'regions'
    | 'taxTypes'
    | 'taxRates'
    | 'paymentSystems'
    | 'organizations'
    | 'nomenclatureTypes'
    | 'nomenclatureGroups'
    | 'nomenclatures'
    | 'activityDirections'
    | 'activityTypes'
    | 'activityGroupTemplates'
    | 'activityTemplates'
    | 'nomenclatureLocations'
    | 'nomenclatureActivities'
    | 'nomenclatureSubgroups'
    | 'nomenclatureActivations'
    | 'activityKinds'
    | 'activityCourses'
    | 'nomenclatureProfiles'
    | 'nomenclatureProfileHistoryStatuses'
    | 'nomenclatureProfiles'
    | 'nomenclatureStatuses'
    | 'activityStates'
    | 'activityGroupTrainers'
    | 'activityGroupProfiles'
    | 'activityGroupSchedules'
    | 'activities'
    | 'ageCategories'
    | 'levelPreparations'
    | 'activityGroups';

    export interface ActivityKindsFilterParams {
      search ?: string;
      showDeleted?: boolean;
      isPaymentRequired?: boolean;
    }

    export interface ActivityCoursesFilterParams {
      search ?: string;
      organizationId ?: string;
      activityDirectionId ?: string;
      activityTypeId ?: string;
      showDeleted?: boolean;
      isActive?: boolean;
      dateStart?: Date;
      dateFinish?: Date;
    }

   export interface PermissionsFilterParams {
     search ?: string;
     showDeleted?: boolean;
   }

   export interface RegionsFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

   export interface SocialNetweroksFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface UsersFilterParams {
    search ?: string;
    bornFrom ?: string;
    bornTo ?: string;
    sex ?: string;
    showDeleted?: boolean;
    isActive?: boolean;
  }

  export interface RolesFilterParams {
    search ?: string;
    isBase ?: boolean;
    showDeleted?: boolean;
  }

  export interface CitiesFilterParams {
    search ?: string;
    regionId ?: number;
    showDeleted?: boolean;
  }

  export interface LocationsFilterParams {
    search ?: string;
    organizationId ?: number;
    cityId?: number;
    showDeleted?: boolean;
    isActive?: boolean;
  }
  export interface RoomsFilterParams {
    search ?: string;
    locationId ?: number;
    userId ?: number;
    showDeleted?: boolean;
    isActive?: boolean;
    onlyOneActivity?: boolean;
  }
  export interface ProfilesFilterParams {
    search ?: string;
    roleId ?: number;
    showDeleted?: boolean;
  }

  export interface TaxRatesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface TaxTypesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface PaymentSystemsFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface OrganizationsFilterParams {
    search ?: string;
    parentId ?: number;
    taxTypeId ?: number;
    taxRateId ?: number;
    showDeleted?: boolean;
  }

  export interface NomenclatureTypesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface NomenclatureGroupsFilterParams {
    search ?: string;
    organizationId ?: number;
    taxRateId ?: number;
    isActive?: boolean;
    showDeleted?: boolean;
  }

  export interface NomenclaturesFilterParams {
    search ?: string;
    organizationId ?: number;
    nomenclatureSubgroupId ?: number;
    nomenclatureTypeId ?: number;
    nomenclatureActivationId ?: number;
    taxRateId ?: number;
    isFree ?: boolean;
    isPfdo ?: boolean;
    showDeleted?: boolean;
  }

  export interface ActivityDirectionsFilterParams {
    search ?: string;
    organizationId ?: number;
    locationId ?: number;
    showDeleted?: boolean;
    isActive ?: boolean;
  }

  export interface ActivityTypesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface ActivityGroupTemplatesFilterParams {
    search ?: string;
    organizationId ?: number;
    directionId ?: number;
    activityTypeId ?: number;
    showDeleted?: boolean;
    dateStart?: Date;
    dateFinish?: Date;
    isActive ?: boolean;
  }

  export interface ActivityTemplatesFilterParams {
    search ?: string;
    organizationId ?: number;
    activityGroupTemplateId ?: number;
    roomId ?: number;
    showDeleted?: boolean;
  }

  export interface NomenclatureLocationsFilterParams {
    search ?: string;
    roleId ?: number;
    withDeleted?: boolean;
  }
//
  export interface NomenclatureActivitiesFilterParams {
    search ?: string;
    roleId ?: number;
    withDeleted?: boolean;
  }

  export interface NomenclatureSubgroupFilterParams {
    search ?: string;
    organizationId ?: number;
    showDeleted?: boolean;
    taxRateId ?: number;
    nomenclatureGroupId ?: number;
  }

  export interface NomenclatureActivationsFilterParams {
    search ?: string;
    organizationId ?: string;
    taxRateId ?: string;
    nomenclatureGroupId ?: string;
    isActive ?: boolean;
    showDeleted?: boolean;
  }

  export interface LogsFilterParams {
    dateFrom?: string;
    dateTo?: string;
  }

  // New

  export interface NomenclatureProfilesFilterParams {
    search ?: string;
    nomenclatureId ?: number;
    profileId ?: number;
    activityGroupId ?: number;
    nomenclatureStatusId ?: number;
    activationFrom ?: number | string;
    activationTo ?: number | string;
    expiredFrom ?: number | string;
    expiredTo ?: number | string;
    isEnded ?: boolean;
    isFullyPaid ?: boolean;
    showDeleted?: boolean;
  }
  export interface NomenclatureProfileHistoryStatusesFilterParams {
    nomenclatureStatusId ?: number;
    nomenclatureProfileId ?: number;
    showDeleted?: boolean;
  }
  export interface NomenclatureStatusesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }
  // export interface NomenclaturesFilterParams{
  //   search ?: string;
  //   organizationId ?: number;
  //   nomenclatureSubgroupId ?: number;
  //   nomenclatureTypeId ?: number;
  //   nomenclatureActivationId ?: number;
  //   taxRateId ?: number;
  //   showDeleted?: boolean;
  //   isFree?: boolean;
  //   isPfdo?: boolean;
  // }

  export interface ActivityStatesFilterParams {
    search ?: string;
    showDeleted?: boolean;
  }

  export interface ActivityGroupTrainersFilterParams {
    userId ?: number;
    activityGroupId ?: number;
    showDeleted?: boolean;
    isMain?: boolean;
  }

  export interface ActivityGroupProfilesFilterParams {
    profileId ?: number;
    activityGroupId ?: number;
    showDeleted?: boolean;
    isActive?: boolean;
    isRecorder?: boolean;
  }

  export interface ActivityGroupSchedulesFilterParams {
    trainerId ?: number;
    activityGroupId ?: number;
    roomId ?: number;
    showDeleted?: boolean;
    parentActivityGroupSchedule?: number | string;
  }

  export interface ActivitiesFilterParams {
    search ?: string;
    datetimeActivityStart ?: string | number;
    datetimeActivityFinish ?: string | number;
    trainerId ?: number;
    activityGroupId ?: number;
    activityGroupScheduleId ?: number;
    activityStateId ?: number;
    roomId ?: number;
    showDeleted?: boolean;
  }

  export interface AgeCategoriesFilterParams {
    search ?: string;
    organizationId ?: number;
    showDeleted?: boolean;
  }

  export interface LevelPreparationsFilterParams {
    search ?: string;
    organizationId ?: number;
    showDeleted?: boolean;
  }
  export interface ActivityGroupsFilterParams {
    search ?: string;
    dateStart ?: string;
    dateFinish ?: string;
    organizationId ?: number;
    activityGroupTemplateId ?: number;
    activityCourseId ?: number;
    activityKindId ?: number;
    isOnline?: boolean;
    isPfdo?: boolean;
    isActive?: boolean;
    isPublished?: boolean;
    showDeleted?: boolean;
  }

  export type FilterDataTypes = | UsersFilterParams | LogsFilterParams | RolesFilterParams
                                | CitiesFilterParams| LocationsFilterParams | RoomsFilterParams
                                | ProfilesFilterParams | TaxRatesFilterParams |TaxTypesFilterParams
                                | PaymentSystemsFilterParams | OrganizationsFilterParams
                                | NomenclatureTypesFilterParams | NomenclatureGroupsFilterParams
                                | NomenclaturesFilterParams | ActivityDirectionsFilterParams
                                | ActivityTypesFilterParams | ActivityGroupTemplatesFilterParams
                                | ActivityTemplatesFilterParams | RegionsFilterParams
                                | NomenclatureSubgroupFilterParams | NomenclatureActivationsFilterParams
                                | ActivityKindsFilterParams | ActivityCoursesFilterParams
                                | NomenclatureProfilesFilterParams | NomenclatureProfileHistoryStatusesFilterParams
                                | ActivityStatesFilterParams | ActivityGroupTrainersFilterParams | ActivityGroupProfilesFilterParams
                                | ActivityGroupSchedulesFilterParams | ActivitiesFilterParams | AgeCategoriesFilterParams
                                | LevelPreparationsFilterParams | ActivityGroupsFilterParams;

  export interface Pagination {
    sortBy?: string;
    descending?: boolean;
    page?: number;
    rowsPerPage?: number;
    rowsNumber?: number;
  }
}
