import { GetTransports, GetBikePoints } from '@store/actions/services'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader";
import { getBikePoints, getTransports, getIsLoading } from '@store/selectors/services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faTrafficLight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ServiceType, LineStatus, BikePoint } from '@models/constants';
import { useDebouncedCallback } from 'use-debounce'
import { 
  ContentBody, 
  ContentHeading, 
  ContentLayoutView, 
  ContentView, 
  CycleView, 
  HomeScreenView, 
  MenuLayoutView, 
  MenuView, 
  override,
  ServiceView 
} from './home.styled'
import { useMemo } from 'react';

const Home = () => {
  const [selectedTransport, setSelectedTransport] = useState<
    {
      id: string,
      lineStatuses: any
    }>({
      id: '',
      lineStatuses: []
    });
  const [searchService, setSearchService] = useState('');
  const [searchBike, setSearchBike] = useState('');
  const [isCycleViewShown, setIsCycleShown] = useState(false);
  const transports = useSelector(getTransports);
  const _bikePoints = useSelector(getBikePoints);
  const isBikeLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const bikePoints = useMemo(() => {
    return (_bikePoints || {})[searchBike]
  }, [_bikePoints, searchBike]);

  
  const debouncedDispatchGetBikePoints = useDebouncedCallback((_searchBike: string) => handleGetBikePointsInformation(_searchBike), 1000);

  useEffect(() => {
    dispatch(GetTransports.Actions.REQUEST())
    dispatch(GetBikePoints.Actions.REQUEST(''))
  }, [dispatch])

  useEffect(() => {
    if (transports?.length > 0) {
      setSelectedTransport(transports[0]);
    }
  }, [transports])

  const handleGetBikePointsInformation = (_searchBike: string) => {
    dispatch(GetBikePoints.Actions.REQUEST(_searchBike))
  }
  const handleSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchService(evt.target.value);
  }
  const handleSelectService = (service: { id: string, lineStatuses: [LineStatus] }) => {
    setIsCycleShown(false);
    setSelectedTransport(service);
  }
  const getMatchedResults = () => {
    if (searchService) {
      return transports.filter((service: any) => ~service.name.toUpperCase().indexOf(searchService.toUpperCase()))
    }
    return transports;
  }
  const isOperatedInNight = (data: [ServiceType]) => {
    if (data?.length > 0) {
      if (data.filter((item: ServiceType) => item.name === "Night").length > 0) {
        return true;
      }
    }
    return false;
  }
  const hasDisruptions = (data: [LineStatus]) => {
    if (data?.length > 0) {
      if (data.filter((item: LineStatus) => item.statusSeverity === 10).length > 0) {
        return true
      }
    }
    return false
  }
  const handleSearchBike = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBike(evt.currentTarget.value)
    debouncedDispatchGetBikePoints(evt.currentTarget.value);
  }
  const handleCycleView = () => {
    setSelectedTransport({ id: '', lineStatuses: [] });
    setIsCycleShown(true);
  }
  const createBikePointDescription = (bikePoint: BikePoint) => {
    return `${bikePoint.id.split('_')[1]} ${bikePoint.commonName} (${bikePoint.lat}, ${bikePoint.lon})}`
  }

  return (
    <HomeScreenView>
      <MenuLayoutView>
        <MenuView>
          <li className="search-input">
            <input type="text" value={searchService} placeholder="Search Transport" onChange={handleSearchText} />
          </li>
          {
            transports?.length > 0 && getMatchedResults().map((service: any) =>
              <li
                onClick={() => handleSelectService(service)}
                key={service.id}
                className={`${selectedTransport.id === service.id ? 'active' : ''}`}>
                <span> {service.name} </span>
                <span className="icons">
                  <FontAwesomeIcon icon={isOperatedInNight(service.serviceTypes) ? faMoon : faSun} />
                  <FontAwesomeIcon icon={hasDisruptions(service.lineStatuses) ? faTrafficLight : faExclamationCircle} />
                </span>
              </li>
            )
          }
          <li className={`cycle-hire ${isCycleViewShown ? 'active' : ''}`} onClick={handleCycleView}>
            Cycle Hire
          </li>
        </MenuView>
      </MenuLayoutView>
      <ContentLayoutView>
        <ContentView>
          {
            !isCycleViewShown ?
              hasDisruptions(selectedTransport.lineStatuses) ?
                <ServiceView>
                  <ContentHeading>
                    No service disruptions
                  </ContentHeading>
                </ServiceView> :
                <ServiceView>
                  <ContentHeading>
                    Service currently suffering disruptions
                  </ContentHeading>
                  <ContentBody>
                    <ul>
                      {
                        selectedTransport?.lineStatuses?.length > 0 &&
                        selectedTransport?.lineStatuses?.map((lineStatus: LineStatus) =>
                          <li key={lineStatus.id}>{lineStatus.reason}</li>
                        )
                      }
                    </ul>
                  </ContentBody>
                </ServiceView>
              :
              <CycleView>
                <div className="search-bike__wrap">
                  <input className="search-bike__input" type="text" value={searchBike} onChange={handleSearchBike} placeholder="Search Bike Info" />
                </div>
                {
                  isBikeLoading
                    ? <FadeLoader color="rgb(54, 215, 183)" css={override} loading={isBikeLoading} />
                    : <div className="search-results__wrap">
                      {
                        (bikePoints ?? []).length > 0 ?
                          <ul>
                            {
                              bikePoints.map((bikePoint: BikePoint) =>
                                <li key={`${bikePoint.id}`}>{createBikePointDescription(bikePoint)}</li>
                              )
                            }
                          </ul>
                          :
                          <span>No bike points found for {`'${searchBike}'`}</span>
                      }
                    </div>
                }
              </CycleView>
          }
        </ContentView>
      </ContentLayoutView>
      <FadeLoader color="rgb(54, 215, 183)" css={override} loading={!transports?.length} />
    </HomeScreenView>
  )
}

export default Home