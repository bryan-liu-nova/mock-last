export const ICON_MULTIPLY_URL = "https://img.icons8.com/ios/50/666666/multiply.png";
export const ICON_SEARCH_URL = "https://img.icons8.com/ios/50/ffffff/search--v1.png";
export const ICON_CHEVRON_RIGHT_URL = (color: string = "ffffff") =>  `https://img.icons8.com/ios/50/${color}/circled-chevron-right.png`;
export const ICON_CHEVRON_LEFT_URL = (color: string = "ffffff") => `https://img.icons8.com/ios/50/${color}/circled-chevron-left.png`;
export const GET_ARTISTS_URL = (
  name: string, 
  page: number = 1, 
  limit: number = 20
) => `?method=artist.search&page=${page}&limit=${limit}&artist=${name}&api_key=${process.env.REACT_APP_KEY}&format=json`
export const GET_ARTIST_PROFILE_URL = (
  name: string, 
  mbid: string
) => `?method=artist.getinfo&mbid=${mbid}&artist=${name}&api_key=${process.env.REACT_APP_KEY}&format=json`

export const TAG_COLORS = [
  '#4fc3f7',
  '#4db6ac',
  '#f06292',
  '#ba68c8',
  '#7283a7',
  '#00c851'
]