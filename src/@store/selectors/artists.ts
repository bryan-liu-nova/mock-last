import { createSelector } from "reselect";

export const getState = (state: any) => state.artists;

export const getArtists = createSelector(
  getState,
  ({ artists }) => artists?.response?.results?.artistmatches?.artist ?? []
);

export const getArtistProfile = createSelector(
  getState,
  ({ profile }) => profile?.response?.artist ?? {}
);

export const isLoadingGetArtistProfile = createSelector(
  getState,
  ({ isLoadingGetArtistProfile }) => isLoadingGetArtistProfile
);

export const getLoadingArtists = createSelector(
  getState,
  ({ isLoadingGetArtists }) => isLoadingGetArtists
);
