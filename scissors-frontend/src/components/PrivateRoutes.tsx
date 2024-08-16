import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoutes() {
    // const navigate = useNavigate()
    const {user} = useAuth()
    // const user = false
  return (
    user ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes