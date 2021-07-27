import { all, takeLatest } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/services'
import getServicesStatus from './getServicesStatus'
import getBikePoints from './getBikePoints'

export default function* root() {
  const { GetServicesStatus, GetBikePoints } = ServicesAsyncActions
  yield all([
    takeLatest(GetServicesStatus.Types.REQUEST, getServicesStatus),
    takeLatest(GetBikePoints.Types.REQUEST, getBikePoints)
  ])
}