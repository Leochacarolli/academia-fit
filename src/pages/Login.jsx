import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Botao from '../components/Botao'
import Mensagem from '../components/Mensagem'

const Login = () => {
  const usuarioRef = useRef()
  const senhaRef = useRef()
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const paginaAnterior = location.state?.de || '/alunos'

  const entrar = (e) => {
    e.preventDefault()
    const usuario = usuarioRef.current.value
    const senha = senhaRef.current.value

    if (!usuario || !senha) {
      setErro('Preencha usuário e senha')
      return
    }

    if (login(usuario, senha)) {
      navigate(paginaAnterior, { replace: true })
    } else {
      setErro('Usuário ou senha incorretos')
    }
  }

  return (
    <div className="pagina-login">
      <form className="caixa-login" onSubmit={entrar}>
        <h2>Área administrativa</h2>
        <p className="dica">Use <b>admin</b> / <b>1234</b></p>

        <Mensagem tipo="erro" texto={erro} />

        <div className="campo">
          <label htmlFor="usuario">Usuário</label>
          <input id="usuario" ref={usuarioRef} defaultValue="" />
        </div>
        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" ref={senhaRef} />
        </div>

        <Botao type="submit">Entrar</Botao>
      </form>
    </div>
  )
}

export default Login
