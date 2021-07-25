import { all, takeLatest } from 'redux-saga/effects'
import { AuthAsyncActions } from '@store/actions/auth'
import signIn from './signIn'

export default function* root() {
  const { SignIn } = AuthAsyncActions
  yield all([    
    takeLatest(SignIn.Types.REQUEST, signIn)
  ])
}