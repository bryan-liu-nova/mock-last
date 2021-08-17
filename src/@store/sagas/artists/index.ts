import { all, takeLatest } from 'redux-saga/effects'
import { ServicesAsyncActions } from '@store/actions/artists'
import { loadArtists, loadArtistProfile } from './getArtists'

export default function* root() {
  const { GetArtists, GetArtistProfile } = ServicesAsyncActions
  yield all([
    takeLatest(GetArtists.Types.REQUEST, loadArtists),
    takeLatest(GetArtistProfile.Types.REQUEST, loadArtistProfile),
  ])
}