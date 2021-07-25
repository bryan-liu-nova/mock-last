declare namespace farnham {
  type AsyncAction = {
    REQUEST: string
    SUCCESS: string
    FAILURE: string
  }

  type HandlerOption = {
    singular: boolean
    mapToKey: string
    payloadDataField: string
  }

  type USER_ROLE = 'admin' | 'guest'
}