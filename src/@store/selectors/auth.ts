import { createSelector } from 'reselect'

import get from 'lodash/get'

export const getState = (state: any) => state.auth

export const getToken = createSelector(
  getState,
  state => state.token
)

export const getCurrentUser = createSelector(
  getState,
  state => state.user
)

export const getHasToken = createSelector(
  getToken,
  token => !!token
)