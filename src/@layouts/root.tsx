import React from 'react'
import { renderRoutes } from 'react-router-config'

const Root: React.FC<{
  route: any
}> = ({ route }) => (
  <div>{renderRoutes(route.routes)}</div>
)

export default Root