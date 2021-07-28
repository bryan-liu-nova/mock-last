export type ServiceType = {
  $type: string,
  name: string,
  uir: string
}
export type LineStatus = {
  $type: string,
  id: number,
  statusSeverity: number,
  statusSeverityDescription: string,
  reason: string, 
  created: Date,
  validityPeriods: Array<ValidityPeriod>
}
export type ValidityPeriod = {
  $type: string,
  fromDate: Date,
  toDate: Date,
  isNow: boolean
}
export type BikePoint = {
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