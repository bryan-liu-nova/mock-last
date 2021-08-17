import { all, fork } from 'redux-saga/effects'
import artists from './artists'

const rootSaga = function* root() {
  yield all([
    fork(artists)
  ])
}

export default rootSaga