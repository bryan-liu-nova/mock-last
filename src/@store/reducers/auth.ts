import { AuthAsyncActions } from '@store/actions/auth'
import { createReducerFromActions } from '@utils/store'
import { values } from 'lodash'


export default createReducerFromActions(...values(AuthAsyncActions))