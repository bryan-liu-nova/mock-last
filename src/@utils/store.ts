import Immutable from 'seamless-immutable'
import { merge } from 'lodash'
import get from 'lodash/get'
import set from 'lodash/set'
import { captialize } from './string'

type AsyncActionTypes = {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
}

type Action = (...payload: any[]) => {
  type: string
  payload: { [key: string]: any }
}

type AsyncAction = {
  Actions: {
    REQUEST: Action
    SUCCESS: Action
    FAILURE: Action
  }
  Types: AsyncActionTypes
  Name: string
}

export const createAsyncAction = (prefix: string, name: string, params?: {
  REQUEST?: string[]
  SUCCESS?: string[]
  FAILURE?: string[]
}): AsyncAction => {
  const defaultParams = {
    REQUEST: [],
    SUCCESS: [],
    FAILURE: ['error']
  }

  const { REQUEST: paramsForRequest, SUCCESS: paramsForSuccess, FAILURE: paramsForFailure } = merge({}, params, defaultParams)

  const Types = {
    REQUEST: `${prefix}.${name}.REQUEST`,
    SUCCESS: `${prefix}.${name}.SUCCESS`,
    FAILURE: `${prefix}.${name}.FAILURE`
  }

  const Actions = {
    'REQUEST': (...payload: string[]) => ({
      type: Types.REQUEST,
      payload: paramsForRequest.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
    'SUCCESS': (...payload: string[]) => ({
      type: Types.SUCCESS,
      payload: paramsForSuccess.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
    'FAILURE': (...payload: string[]) => ({
      type: Types.FAILURE,
      payload: paramsForFailure.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
  }

  return { Actions, Types, Name: name }
}

export const createField = (field: string) => {
  return {
    [`isLoading${captialize(field)}`]: false,
    [`isLoaded${captialize(field)}`]: false,
    [`${field}ErrorMessage`]: false,
  }
}

export const createReducerHandlers = (action: AsyncAction) => {
  const key = captialize(action.Name)
  return {
    [action.Types.REQUEST]: (state: any) => state.merge({
      [`isLoading${key}`]: true,
      [`isLoaded${key}`]: false,
      [`${action.Name}ErrorMessage`]: null
    }),
    [action.Types.FAILURE]: (state: any, action: any) => state.merge({
      [`isLoading${key}`]: false,
      [`isLoaded${key}`]: false,
      [`${action.Name}ErrorMessage`]: get(action, 'error.message', '')
    }),
    [action.Types.SUCCESS]: (state: any, action: any) => {
      let nextState = {
        [`isLoading${key}`]: false,
        [`isLoaded${key}`]: true,
        [`${action.Name}ErrorMessage`]: null
      }

      const payloadResource = get(action, 'payload', {})
      Object.keys(payloadResource).forEach((key: string) => {
        set(nextState, key, payloadResource[key])
      })

      return state.merge(nextState)
    }
  }
}

export const mergeFields = (...actions: AsyncAction[]) => actions.reduce((res, action) => ({...res, ...createField(action.Name)}), {})

export const mergeHandlers = (...actions: AsyncAction[]) => actions.reduce((res, action) => ({...res, ...createReducerHandlers(action)}), {})

export const generateFieldsAndHandlers = (...actions: AsyncAction[]) => ({
  initialState: mergeFields(...actions),
  handler: mergeHandlers(...actions)
})

export const createReducer = (initialState: any, handlers: any) => (
  state = Immutable(initialState),
  action: any,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)

export const createReducerFromActions = (...actions: AsyncAction[]) => {
  const {
    initialState,
    handler
  } = generateFieldsAndHandlers(...actions)

  return createReducer(initialState, handler)
}