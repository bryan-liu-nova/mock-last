import { call, put } from 'redux-saga/effects'
import { AuthAsyncActions } from '@store/actions/auth'
import { apiCall } from '@utils/apiCall'

function* signIn(action: { payload: {email: string, password: string}, type: string}) {
  const { SignIn: { Actions: { SUCCESS, FAILURE } } } = AuthAsyncActions
  const { payload: { email, password } } = action
  try {
  // @ts-ignore
    const response = yield call(apiCall, '/users/login', 'post', { email, password })
    yield put(SUCCESS(response.token, {
      ...response.data
    }))
  } catch (error) {
    console.log(error)
    yield put(FAILURE(error))
  }
}

export default signIn