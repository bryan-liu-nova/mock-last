import { createAsyncAction } from '@utils/store'

export const SignIn = createAsyncAction('auth', 'signIn', {
  REQUEST: ['email', 'password'],
  SUCCESS: ['token', 'user']
})

export const AuthAsyncActions = {
  SignIn
}