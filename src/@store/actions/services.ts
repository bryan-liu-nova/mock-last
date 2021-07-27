import { createAsyncAction } from "@utils/store";

export const GetServicesStatus = createAsyncAction('services', 'getServiceStatus', {
  REQUEST: [],
  SUCCESS: ['servicesStatus'],
});

export const GetBikePoints = createAsyncAction('services', 'getBikePoints', {
  REQUEST: ['query'],
  SUCCESS: ['bikePoints']
})

export const ServicesAsyncActions = {
  GetServicesStatus,
  GetBikePoints
}