import { CartPage, DashboardPage, HomePage, LoginPage } from '@/pages'
import { Route, Routes } from 'react-router-dom'

import { RouterLayout } from '@/components'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/' element={<RouterLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='*' element={<h1>404</h1>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
