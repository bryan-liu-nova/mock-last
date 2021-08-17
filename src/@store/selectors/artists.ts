import { createSelector } from 'reselect'
import * as _ from 'lodash'


export const getState = (state: any) => state.artists

export const getArtists = createSelector(
  getState,
  ({ artists }) => (
    artists
    && artists.response 
    && artists.response.results 
    && artists.response.results.artistmatches
    && artists.response.results.artistmatches.artist) 
      ? artists.response.results.artistmatches.artist
      : []
)

export const getArtistProfile = createSelector(
  getState,
  ({ profile }) => ((
    profile &&
    profile.response &&
    profile.response.artist)
      ? profile.response.artist
      : {}
  )
)

export const isLoadingGetArtistProfile = createSelector(
  getState,
  ({ isLoadingGetArtistProfile }) => isLoadingGetArtistProfile
)

export const getLoadingArtists = createSelector(
  getState,
  ({ isLoadingGetArtists }) => isLoadingGetArtists
)