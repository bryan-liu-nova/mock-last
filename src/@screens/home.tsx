import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { GetArtists } from '@store/actions/artists'
import { getArtists, getLoadingArtists } from '@store/selectors/artists'
import { ICON_MULTIPLY_URL, ICON_SEARCH_URL } from '@constants/app'
import Pagination from '@components/pagination'
import {
  ClearIcon,
  Content,
  Container,
  IconWrap,
  override,
  ProfileItem,
  ProfileWrap,
  SearchIcon,
  SearchInput,
  SearchWrap
} from './home.styled'
import { FadeLoader } from 'react-spinners'

const Home = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const _artists = useSelector(getArtists);
  const isArtistsLoading = useSelector(getLoadingArtists);

  useEffect(() => {
    dispatch(GetArtists.Actions.REQUEST(''))
  }, [dispatch]);

  const handleGetArtists = (_search: string, page: number = 1) => {
    dispatch(GetArtists.Actions.REQUEST(_search, page))
  }
  const debouncedHandleSearch = useDebouncedCallback(
    (_search, page) => handleGetArtists(_search, page), 1000
  );
  const handleSearchArtists = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const _search = event.target.value;
    debouncedHandleSearch(_search, page);
    setPage(1);
    setSearch(_search);
  }
  const handleClearSearch = () => {
    if (search) {
      setSearch('');
      setPage(1);
      handleGetArtists('');
    }
  }
  const handleChangePage = (page: number) => {
    if (!isArtistsLoading) {
      handleGetArtists(search, page);
      setPage(page);
    }
  }
  return (
    <Container>
      <SearchWrap>
        <SearchInput placeholder="Search for artists..." value={search} onChange={handleSearchArtists} />
        <IconWrap>
          <ClearIcon onClick={handleClearSearch}>
            <img src={ICON_MULTIPLY_URL} alt="unable to load..." />
          </ClearIcon>
          <SearchIcon>
            <img src={ICON_SEARCH_URL} alt="unable to load..." />
          </SearchIcon>
        </IconWrap>
      </SearchWrap>
      <Content>
        <ProfileWrap>
          {
            (_artists ?? []).map((profile: any) =>
              <ProfileItem key={`${profile.mbid}-${profile.listeners}`}>
                <div>
                  <Link to={`/${profile.name}/${profile.mbid}/profile`}>
                    {profile.name}
                  </Link>
                </div>
                <div className="listener">
                  <label>{parseInt(profile.listeners).toLocaleString()} listeners</label>
                </div>
                <div>
                  <Link to="" />
                </div>
              </ProfileItem>
            )
          }
        </ProfileWrap>
        <FadeLoader color="rgb(54, 215, 183)" css={override} loading={isArtistsLoading} />
      </Content>
      <Pagination page={page} artists={_artists} handleChangePage={(page) => handleChangePage(page)} />
    </Container>
  )
}

export default Home