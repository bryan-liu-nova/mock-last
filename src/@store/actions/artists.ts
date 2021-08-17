import { createAsyncAction } from "@utils/store";

export const GetArtists = createAsyncAction('artists', 'getArtists', {
  REQUEST: ['name', 'page'],
  SUCCESS: ['artists'],
});

export const GetArtistProfile = createAsyncAction('artists', 'getArtistProfile', {
  REQUEST: ['name', 'mbid'],
  SUCCESS: ['profile']
}) 

export const ServicesAsyncActions = {
  GetArtists,
  GetArtistProfile
}