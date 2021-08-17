import { call, put, select } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/artists'
import { apiCall } from '@utils/apiCall'
import { getArtists } from '@store/selectors/artists'
import { GET_ARTISTS_URL, GET_ARTIST_PROFILE_URL } from '@constants/app'

function* loadArtists(action: { payload: {name: string, page: number}, type: string}) {
  const { GetArtists: { Actions: { SUCCESS, FAILURE } } } = ServicesAsyncActions
  const { payload: { name, page} } = action
  // @ts-ignore
  const artists = yield select(getArtists)
  if (artists.length > 0) {
    yield put(SUCCESS(artists))
  } else {
    try {
    // @ts-ignore
      const response = yield call(apiCall, GET_ARTISTS_URL(name, page), 'get')
      yield put(SUCCESS({
        response
      }))
    } catch (error) {
      console.log(error)
      yield put(FAILURE(error))
    }
  }
}

function* loadArtistProfile(action: { payload: {name: string, mbid: string}, type: string}) {
  const { GetArtistProfile: { Actions: { SUCCESS, FAILURE } } } = ServicesAsyncActions
  const { payload: { name, mbid } } = action
  // @ts-ignore
  const artists = yield select(getArtists)
  if (artists.length > 0) {
    yield put(SUCCESS(artists))
  } else {
    try {
    // @ts-ignore
      const response = yield call(apiCall, GET_ARTIST_PROFILE_URL(name, mbid), 'get')
      yield put(SUCCESS({
        response
      }))
    } catch (error) {
      console.log(error)
      yield put(FAILURE(error))
    }
  }
}

export {
  loadArtists,
  loadArtistProfile
}