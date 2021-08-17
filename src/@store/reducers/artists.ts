// Todo: Manually Set Initial Value
import { createReducerFromActions } from '@utils/store'
import { ServicesAsyncActions } from '@store/actions/artists'
import values from 'lodash/values'

export default createReducerFromActions(...values(ServicesAsyncActions));