import { createSelector } from 'reselect'
import * as _ from 'lodash'


export const getState = (state: any) => state.services

const getSortedServices = (data: any) => {
  if (data && data.length > 0) {
    let services = _.sortBy(data, ['modeName', 'name']);
    // console.log(services, 'this is services');
    return services;
  }
  return data
}

export const getServices = createSelector(
  getState,
  ({ servicesStatus }) => getSortedServices(servicesStatus)
)

export const getBikePoints = createSelector(
  getState,
  ({ bikePoints }) => (bikePoints)
)

export const getIsLoading = createSelector(
  getState,
  ({ isLoadingGetBikePoints }) => (isLoadingGetBikePoints)
)