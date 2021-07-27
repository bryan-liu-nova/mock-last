import { call, put } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/services'
import { apiCall } from '@utils/apiCall'

function* getBikePoints(action: { payload: {query: string}, type: string}) {
  const { GetBikePoints: { Actions: { SUCCESS, FAILURE } } } = ServicesAsyncActions
  const { payload: { query } } = action
  try {
  // @ts-ignore
    const response = yield call(apiCall, `/BikePoint/Search?query=${query}`, 'get')
    yield put(SUCCESS(response))
  } catch (error) {
    console.log(error)
    yield put(FAILURE(error))
  }
}

export default getBikePoints