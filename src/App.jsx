import { useState } from 'react'
import { useAlunos } from './context/AlunosContext'
import AlunoForm from './components/AlunoForm'
import TabelaAlunos from './components/TabelaAlunos'
import Botao from './components/Botao'
import Mensagem from './components/Mensagem'

function App() {
  const { alunos, carregando, erro, mensagem, adicionar, editar, remover } = useAlunos()
  const [alunoEditando, setAlunoEditando] = useState(null)
  const [formKey, setFormKey] = useState(0)
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const alunosFiltrados = alunos
    .filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()))
    .filter((a) => {
      if (filtroStatus === 'ativos') return a.ativo
      if (filtroStatus === 'inativos') return !a.ativo
      return true
    })

  const salvar = async (dados) => {
    const deuCerto = alunoEditando
      ? await editar(alunoEditando.id, dados)
      : await adicionar(dados)

    if (deuCerto) {
      setAlunoEditando(null)
      setFormKey(formKey + 1)
    }
  }

  const selecionarParaEditar = (aluno) => {
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
        {mensagem && <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} />}

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

        <div className="filtros">
          <input
            placeholder="🔎 Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="ativos">Ativos</option>
            <option value="inativos">Inativos</option>
          </select>
        </div>

        {carregando && <p>Carregando alunos...</p>}
        {erro && <Mensagem tipo="erro" texto={erro} />}
        {!carregando && !erro && (
          <>
            <p className="contador">Mostrando {alunosFiltrados.length} de {alunos.length} alunos</p>
            <TabelaAlunos alunos={alunosFiltrados} onEditar={selecionarParaEditar} onExcluir={remover} />
          </>
        )}
      </main>
    </>
  )
}

export default App
