import { ADMIN_ROOT, AUTH_ROOT, PUBLIC_PATHS, ROOT_PATH } from "@constants/paths"
import Admin from '@layouts/admin'
import Auth from '@layouts/auth'
import Public from '@layouts/public'
import Root from '@layouts/root'
import adminRoutes from './admin'
import authRoutes from './auth'
import publicRoutes from './public'

const routesForRole = (viewer: farnham.USER_ROLE) => ({
  'admin': [
    {
      path: ADMIN_ROOT,
      component: Admin,
      routes: adminRoutes(viewer),
    },
  ],
  'guest': [

  ]
}[viewer])

const routes = (viewer: farnham.USER_ROLE) => {
  let viewerRouters: any = []

  if (viewer !== 'guest') {
    viewerRouters = routesForRole(viewer) || []
  }

  const allRoutes = [
    ...viewerRouters,
    {
      path: AUTH_ROOT,
      component: Auth,
      routes: authRoutes(viewer)
    },
    // {
    //   path: PUBLIC_PATHS.NOT_FOUND,
    //   component: NotFound
    // },
    {
      path: ROOT_PATH,
      component: Public,
      routes: publicRoutes()
    }
  ]

  return [
    {
      component: Root,
      routes: allRoutes
    }
  ]
}

export default routes