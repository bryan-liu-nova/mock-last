import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArtistProfile } from "@store/selectors/artists";
import { GetArtistProfile } from "@store/actions/artists";
import { TAG_COLORS } from "@constants/app";
import {
  Container,
  Content,
  Header,
  NameWrap,
  StatsWrap,
  SimilarArtistsWrap,
  Summary,
  SummaryWrap,
  TagsWrap,
  Tag
} from './profile.styled';

type ArtistIdentityType = {
  name: string,
  mbid: string,
};

type TagType = {
  name: string,
  url: string,
}

type SimilarArtistType = {
  name: string,
  url: string,
}

const Profile = () => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(getArtistProfile);
  const { name, mbid } = useParams<ArtistIdentityType>();
  let history = useHistory();

  const handleBackToHome = () => {
    history.push('/');
  }

  useEffect(() => {
    dispatch(GetArtistProfile.Actions.REQUEST(name, mbid))
  }, [dispatch, name, mbid]);

  return (
    <Container>
      <Header>
        <div onClick={handleBackToHome}>
          <img src="https://img.icons8.com/ios/30/ffffff/exit.png" alt="unable to load..."/>
        </div>
      </Header>
      <Content>
        <NameWrap >{name}</NameWrap>
        <StatsWrap>
          {
            profile && profile.stats && Object.keys(profile.stats)?.length > 0 && Object.keys(profile.stats).map((stat: string) => 
              <div key={stat}>
                <label>
                  {parseInt(profile.stats[stat]).toLocaleString()} {stat}
                </label>
              </div>
            )
          }
        </StatsWrap>
        <TagsWrap>
          {
            profile && profile.tags?.tag?.length > 0 && profile.tags.tag.map((item: TagType, index: number) => 
              <Tag key={item.name} color={TAG_COLORS[index]}>{item.name}</Tag>
            )
          }
        </TagsWrap>
        <SummaryWrap>
          {
            profile && profile.bio && 
            <React.Fragment>
              <Summary dangerouslySetInnerHTML={{ 
                __html: readMore 
                  ? profile.bio.content 
                  : profile.bio.summary
                }}
              ></Summary>
              <div className="read-more" onClick={() => setReadMore(prev => !prev)}>
                {
                  readMore ? 'Click here to collapse...' : 'Click here to read more...'
                }
              </div>
            </React.Fragment>
          }
        </SummaryWrap>
        <div className="title">Similar To</div>
        <SimilarArtistsWrap>
          {
            profile?.similar?.artist?.length > 0 && profile.similar.artist.map((artist: SimilarArtistType) =>
              <div key={artist.name}>
                <div>{artist.name}</div>
                <div>
                  <a href={artist.url}>Click here to see more on last.fm</a>
                </div>
              </div>
            )
          }
        </SimilarArtistsWrap>
      </Content>
    </Container>
  )
}

export default Profile;