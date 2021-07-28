import { all, takeLatest } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/services'
import getTransports from './getTransports'
import getBikePoints from './getBikePoints'

export default function* root() {
  const { GetTransports, GetBikePoints } = ServicesAsyncActions
  yield all([
    takeLatest(GetTransports.Types.REQUEST, getTransports),
    takeLatest(GetBikePoints.Types.REQUEST, getBikePoints)
  ])
}