import { createAsyncAction } from "@utils/store";

export const GetTransports = createAsyncAction('services', 'getTransports', {
  REQUEST: [],
  SUCCESS: ['transports'],
});

export const GetBikePoints = createAsyncAction('services', 'getBikePoints', {
  REQUEST: ['query'],
  SUCCESS: ['bikePoints']
})

export const ServicesAsyncActions = {
  GetTransports,
  GetBikePoints
}