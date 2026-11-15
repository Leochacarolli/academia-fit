import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const USUARIO_ADMIN = { usuario: 'admin', senha: '1234' }

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(
    localStorage.getItem('usuario') || null
  )

  const login = (usuario, senha) => {
    if (usuario === USUARIO_ADMIN.usuario && senha === USUARIO_ADMIN.senha) {
      setUsuarioLogado(usuario)
      localStorage.setItem('usuario', usuario)
      return true
    }
    return false
  }

  const logout = () => {
    setUsuarioLogado(null)
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
