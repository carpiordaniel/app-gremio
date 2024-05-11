
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ canActivate = false , redirectPath='/login'}) => {
  if (!canActivate ) {
    return <Navigate to={redirectPath}  />
  }
  
  return <Outlet />
}
