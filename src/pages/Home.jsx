import { Link } from 'react-router-dom'
import { useAlunos } from '../context/AlunosContext'

const Home = () => {
  const { alunos, carregando } = useAlunos()

  const ativos = alunos.filter((a) => a.ativo).length
  const inativos = alunos.length - ativos

  return (
    <div className="pagina">
      <section className="banner">
        <h1>Bem-vindo à Academia FitPro 🏋️</h1>
        <p>Sistema para controlar os alunos da academia: cadastrar, ver, editar e excluir.</p>
        <Link to="/alunos" className="botao botao-primario">Ver alunos</Link>
      </section>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="cards">
          <div className="card">
            <h3>{alunos.length}</h3>
            <p>Alunos cadastrados</p>
          </div>
          <div className="card verde">
            <h3>{ativos}</h3>
            <p>Ativos</p>
          </div>
          <div className="card cinza">
            <h3>{inativos}</h3>
            <p>Inativos</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
