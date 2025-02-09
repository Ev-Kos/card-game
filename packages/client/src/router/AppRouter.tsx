import { Routes, Route } from 'react-router-dom'

import arrayRoutes from './index'

const AppRouter = () => {
  return (
    <Routes>
      {arrayRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default AppRouter
