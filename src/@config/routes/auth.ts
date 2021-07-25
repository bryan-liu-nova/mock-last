import { AUTH_PATHS } from '@constants/paths'
import SignIn from '@screens/login'

const routes = (viewer: farnham.USER_ROLE) => [
  {
    path: AUTH_PATHS.SIGN_IN,
    exact: true,
    component: SignIn
  },
  // {
  //   path: AUTH_PATHS.SIGN_UP,
  //   exact: true,
  //   component: SignUp
  // },
  // { component: NotFoundRedirector }
]

export default routes
