import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { usuarioLogado, logout } = useAuth()
  const navigate = useNavigate()

  const sair = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        💪 Academia <span>FitPro</span>
      </Link>

      <div className="links">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/alunos" end>Alunos</NavLink>
        <NavLink to="/alunos/novo">Novo aluno</NavLink>

        {usuarioLogado ? (
          <>
            <span className="usuario">Olá, {usuarioLogado}</span>
            <button className="botao botao-sair" onClick={sair}>Sair</button>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Navbar
