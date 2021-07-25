import React from 'react'
import { renderRoutes } from 'react-router-config'
import { AuthContainer } from './auth.components'
import { LayoutContainer, LayoutContainerLimiter } from './layout.components'

const Auth: React.FC<{
  route: any
}> = ({ route }) => (
  <LayoutContainerLimiter>
    <LayoutContainer>
      <AuthContainer>
        {renderRoutes(route.routes)}
      </AuthContainer>
    </LayoutContainer>
  </LayoutContainerLimiter>
)

export default Auth