import { call, put, select } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/services'
import { apiCall } from '@utils/apiCall'
import { getBikePoints } from '@store/selectors/services'

function* loadBikePoints(action: { payload: {query: string}, type: string}) {
  const { GetBikePoints: { Actions: { SUCCESS, FAILURE } } } = ServicesAsyncActions
  const { payload: { query } } = action

  // @ts-ignore
  const bikePoints = yield select(getBikePoints)
  if ((bikePoints || {})[query]) {
    yield put(SUCCESS(bikePoints))
  } else {
    try {
    // @ts-ignore
      const response = yield call(apiCall, `/BikePoint/Search?query=${query}`, 'get')
      yield put(SUCCESS({
        ...bikePoints,
        [query]: response
      }))
    } catch (error) {
      console.log(error)
      yield put(FAILURE(error))
    }
  }
}

export default loadBikePoints