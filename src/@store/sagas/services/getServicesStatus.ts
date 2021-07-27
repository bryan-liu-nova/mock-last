import { call, put } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/services'
import { apiCall } from '@utils/apiCall'

function* getServicesStatus() {
  const { GetServicesStatus: { Actions: { SUCCESS, FAILURE } } } = ServicesAsyncActions
  try {
  // @ts-ignore
    const response = yield call(apiCall, '/Line/Mode/tube,overground,dlr/Status?detail=true', 'get')
    yield put(SUCCESS(response))
  } catch (error) {
    console.log(error)
    yield put(FAILURE(error))
  }
}

export default getServicesStatus