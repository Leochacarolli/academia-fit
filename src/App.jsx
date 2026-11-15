import { useEffect, useState } from 'react'
import { buscarAlunos, criarAluno, atualizarAluno, deletarAluno } from './services/api'
import AlunoForm from './components/AlunoForm'
import TabelaAlunos from './components/TabelaAlunos'
import Botao from './components/Botao'

function App() {
  const [alunos, setAlunos] = useState([])
  const [alunoEditando, setAlunoEditando] = useState(null)
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    buscarAlunos()
      .then((dados) => setAlunos(dados))
      .catch((e) => console.log(e))
  }, [])

  const salvar = async (dados) => {
    try {
      if (alunoEditando) {
        const atualizado = await atualizarAluno(alunoEditando.id, dados)
        setAlunos(alunos.map((a) => (a.id === atualizado.id ? atualizado : a)))
      } else {
        const novo = await criarAluno(dados)
        setAlunos([...alunos, novo])
      }
      setAlunoEditando(null)
      setFormKey(formKey + 1)
    } catch (e) {
      alert(`Erro ao salvar: ${e.message}`)
    }
  }

  const excluir = async (aluno) => {
    if (!window.confirm(`Tem certeza que deseja excluir o aluno "${aluno.nome}"?`)) return

    try {
      await deletarAluno(aluno.id)
      setAlunos(alunos.filter((a) => a.id !== aluno.id))
    } catch (e) {
      alert(`Erro ao excluir: ${e.message}`)
    }
  }

  const editar = (aluno) => {
    setAlunoEditando(aluno)
    setFormKey(formKey + 1)
  }

  const cancelar = () => {
    setAlunoEditando(null)
    setFormKey(formKey + 1)
  }

  return (
    <>
      <nav className="navbar">
        <span className="logo">💪 Academia <span>FitPro</span></span>
      </nav>

      <main className="pagina">
        <h2>{alunoEditando ? `Editando: ${alunoEditando.nome}` : 'Cadastrar aluno'}</h2>
        <AlunoForm
          key={formKey}
          alunoInicial={alunoEditando}
          onSalvar={salvar}
          textoBotao={alunoEditando ? 'Salvar alterações' : 'Cadastrar'}
        />
        {alunoEditando && (
          <Botao variante="secundario" onClick={cancelar}>Cancelar edição</Botao>
        )}

        <h2 className="titulo-lista">Alunos</h2>
        <TabelaAlunos alunos={alunos} onEditar={editar} onExcluir={excluir} />
      </main>
    </>
  )
}

export default App
