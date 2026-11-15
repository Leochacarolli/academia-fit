import { Link } from 'react-router-dom'

const NaoEncontrada = () => (
  <div className="pagina centro">
    <h1>404</h1>
    <p>Página não encontrada 🤔</p>
    <Link to="/">Voltar para o início</Link>
  </div>
)

export default NaoEncontrada
