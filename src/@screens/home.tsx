import { GetServicesStatus, GetBikePoints } from '@store/actions/services'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader";
import styled from 'styled-components'
import { css } from "@emotion/react";
import { getBikePoints, getServices, getIsLoading } from '@store/selectors/services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faTrafficLight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedCallback } from 'use-debounce'
const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
interface serviceType {
  $type: string,
  name: string,
  uir: string
}
interface lineStatus {
  $type: string,
  id: number,
  statusSeverity: number,
  statusSeverityDescription: string,
  reason: string, 
  created: Date,
  validityPeriods: Array<validityPeriod>
}
interface validityPeriod {
  $type: string,
  fromDate: Date,
  toDate: Date,
  isNow: boolean
}
interface bikePoint {
  $type: string,
  id: string,
  url: string,
  commonName: string,
  placeType: string,
  additionalProperties: string,
  children: [string],
  childrenUrls: [string],
  lat: number,
  lon: number,
}
const _dataCacheBikePointsInformation: any = [];
const Home = () => {
  const [selectedService, setSelectedService] = useState<
    {
      id: string,
      lineStatuses: any
    }>({
      id: '',
      lineStatuses: []
    });
  const [searchService, setSearchService] = useState('');
  const [searchBike, setSearchBike] = useState('regent');
  const [isCycleViewShown, setIsCycleShown] = useState(false);
  const services = useSelector(getServices);
  const bikePoints = useSelector(getBikePoints);
  const isBikeLoading = useSelector(getIsLoading);

  const [bikePointsFromCache, setBikePointsFromCache] = useState<any>('');
  const dispatch = useDispatch()
  const throttledDispatchGetBikePoints = useDebouncedCallback(() => handleGetBikePointsInformation(), 1000);

  useEffect(() => {
    dispatch(GetServicesStatus.Actions.REQUEST())
    dispatch(GetBikePoints.Actions.REQUEST(searchBike))
  }, [dispatch])
  
  useEffect(() => {
    if (services && services.length > 0) {
      setSelectedService(services[0]);
    }
  }, [services])

  useEffect(() => {
    _dataCacheBikePointsInformation[searchBike] = bikePoints;
    setBikePointsFromCache(bikePoints);
    console.log(_dataCacheBikePointsInformation);
  }, [bikePoints])

  const handleGetBikePointsInformation = () => {
    console.log(_dataCacheBikePointsInformation[searchBike], 'this is test')
    if (!_dataCacheBikePointsInformation[searchBike]) {
      dispatch(GetBikePoints.Actions.REQUEST(searchBike))
    } else {
      setBikePointsFromCache(_dataCacheBikePointsInformation[searchBike])
    }
  }
  const handleSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchService(evt.target.value);
  }
  const handleSelectService = (service: {id: string, lineStatuses: [lineStatus]}) => {
    setIsCycleShown(false);
    setSelectedService(service);
  }
  const getMatchedResults = () => {
    if( searchService ) {
      return services.filter((service: any) => ~service.name.toUpperCase().indexOf(searchService.toUpperCase())) 
    }
    return services;
  }
  const isOperatedInNight = (data: [serviceType]) => {
    if (data && data.length > 0) {
      if (data.filter((item: serviceType) => item.name === "Night").length > 0) {
        return true;
      }
    }
    return false;
  }
  const hasDisruptions = (data: [lineStatus]) => {
    if (data && data.length > 0) {
      if (data.filter((item: lineStatus) => item.statusSeverity === 10 ).length > 0) {
        return true
      }
    }
    return false
  }
  const handleSearchBike = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBike(evt.currentTarget.value)
    throttledDispatchGetBikePoints();
  }
  const handleCycleView = () => {
    setSelectedService({id: '', lineStatuses: []});
    setIsCycleShown(true);
  }
  const getBikePointInfo = (bikePoint: bikePoint) => {
    return `${bikePoint.id.split('_')[1]} ${bikePoint.commonName} (${bikePoint.lat}, ${bikePoint.lon})}`
  }

  return (
    <HomeScreenView>
      <MenuLayoutView>
        <MenuView>
          <li className="search-input">
            <input type="text" value={searchService} placeholder="Search Service" onChange={handleSearchText}/>
          </li>
          {
            services && services.length > 0 && getMatchedResults().map((service: any, idx: number) => 
                <li
                  onClick={() => handleSelectService(service)}
                  key={service.id} 
                  className={`${ selectedService.id  === service.id ? 'active' : ''}`}>
                  <span> {service.name} </span>
                  <span className="icons">
                    {isOperatedInNight(service.serviceTypes) ?
                      <FontAwesomeIcon icon={faMoon} /> :
                      <FontAwesomeIcon icon={faSun} />
                    }
                    {
                      hasDisruptions(service.lineStatuses) ?
                        <FontAwesomeIcon icon={faTrafficLight} /> :
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    }
                  </span>
                </li>
              )
          }
          <li className={`cycle-hire ${isCycleViewShown ? 'active': ''}`} onClick={handleCycleView}>
            Cycle Hire
          </li>
        </MenuView>
      </MenuLayoutView>
      <ContentLayoutView>
        <ContentView>
        {
          !isCycleViewShown ? 
            hasDisruptions(selectedService.lineStatuses) ?
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
                      selectedService && selectedService.lineStatuses && selectedService.lineStatuses.map((lineStatus: lineStatus) => 
                      <li key={lineStatus.id}>{lineStatus.reason}</li>)
                    }
                  </ul>
                </ContentBody>
              </ServiceView>
              :
              <CycleView>
                <div className="search-bike__wrap">
                  <input className="search-bike__input" type="text" value={searchBike} onChange={handleSearchBike} placeholder="Search Bike Info"/>
                </div>
                {
                  isBikeLoading 
                    ? <FadeLoader color="rgb(54, 215, 183)" css={override} loading={isBikeLoading} /> 
                    : <div className="search-results__wrap">
                        {
                          bikePointsFromCache.length > 0 ?
                            <ul>
                              {
                                bikePointsFromCache.map((bikePoint: bikePoint) => 
                                  <li key={bikePoint.id}>{getBikePointInfo(bikePoint)}</li>
                                )
                              }
                              <li></li>
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
      <FadeLoader color="rgb(54, 215, 183)" css={override} loading={!services || !services.length} />
    </HomeScreenView>
  )
}

const HomeScreenView = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`
const MenuLayoutView = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`
const MenuView = styled.ul`
  border-radius: 4px;
  box-shadow: 0 0px 2px 0 rgb(34 36 38 / 15%);
  list-style: 'none';
  border: 1px solid #dcd5d5;
  overflow-y: scroll;
  height: max-content;
  li {
    padding: 13px 16px;
    cursor: pointer;
    border-bottom: 1px solid #dcd5d5;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
    .icons > svg {
      margin: 0 0 0 10px;
      width: 20px;
    }
  }
  li:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  li:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 0px solid;
    
  }
  li.active {
    background-color: rgba(0,0,0,.05);
  }
  li.search-input {
    cursor: default;
    input {
      border: 1px solid #dcd5d5;
      width: 100%;
      padding: 5px;
      border-radius: 4px;
    }
  }
`
const ContentLayoutView = styled.div`
  width: 70%;
  padding: 20px;
`
const ContentView = styled.div`
  box-shadow: 0 0px 2px 1px rgb(34 36 38 / 15%);
  height: 100%;
  width: 100%;
  border-radius: 3px;
  overflow-y: scroll;
 .search-bike__wrap {
    cursor: default;
    padding: 20px;
    .search-bike__input {
      border: 1px solid #dcd5d5;
      padding: 10px 5px;
      border-radius: 3px;
    }
  }
`
const ContentHeading = styled.h2`
  border-bottom: 1px solid #dcd5d5;
  padding: 20px;
`
const ContentBody = styled.div`
  ul li {
    padding: 20px;
    word-break: break-word;
    border-bottom: 1px solid #dcd5d5;
  }
`
const ServiceView = styled.div`

`
const CycleView = styled.div`
  position: relative;
  height: 100%;
  .search-results__wrap {
    padding: 0 20px 20px 20px;
    ul {
      list-style: none;
      li {
        padding: 5px 0px;
      }
    }
  }
`
export default Home