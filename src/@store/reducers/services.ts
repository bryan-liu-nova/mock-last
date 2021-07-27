import { ServicesAsyncActions } from '@store/actions/services'
import { createReducerFromActions } from '@utils/store'
import { values } from 'lodash'

export default createReducerFromActions(...values(ServicesAsyncActions))