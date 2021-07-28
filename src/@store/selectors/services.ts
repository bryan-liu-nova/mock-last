import { createSelector } from 'reselect'
import * as _ from 'lodash'


export const getState = (state: any) => state.services

const getSortedTransports = (data: any) => {
  if (data?.length > 0) {
    return _.sortBy(data, ['modeName', 'name']);
  }
  return data
}

export const getTransports = createSelector(
  getState,
  ({ transports }) => getSortedTransports(transports)
)

export const getBikePoints = createSelector(
  getState,
  ({ bikePoints }) => (bikePoints)
)

export const getIsLoading = createSelector(
  getState,
  ({ isLoadingGetBikePoints }) => (isLoadingGetBikePoints)
)