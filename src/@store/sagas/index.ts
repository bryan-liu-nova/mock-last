import { all, fork } from 'redux-saga/effects'
import services from './services'

const rootSaga = function* root() {
  yield all([
    fork(services)
  ])
}

export default rootSaga