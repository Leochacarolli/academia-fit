import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RotaPrivada = ({ children }) => {
  const { usuarioLogado } = useAuth()
  const location = useLocation()

  if (!usuarioLogado) {
    return <Navigate to="/login" state={{ de: location.pathname }} replace />
  }

  return children
}

export default RotaPrivada
