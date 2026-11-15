import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlunos } from '../context/AlunosContext'
import TabelaAlunos from '../components/TabelaAlunos'
import Mensagem from '../components/Mensagem'

const ListaAlunos = () => {
  const { alunos, carregando, erro, mensagem, remover } = useAlunos()
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const alunosFiltrados = alunos
    .filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()))
    .filter((a) => {
      if (filtroStatus === 'ativos') return a.ativo
      if (filtroStatus === 'inativos') return !a.ativo
      return true
    })

  return (
    <div className="pagina">
      <div className="topo-pagina">
        <h2>Alunos</h2>
        <Link to="/alunos/novo" className="botao botao-primario">+ Novo aluno</Link>
      </div>

      {mensagem && <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} />}

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
          <TabelaAlunos alunos={alunosFiltrados} onExcluir={remover} />
        </>
      )}
    </div>
  )
}

export default ListaAlunos
