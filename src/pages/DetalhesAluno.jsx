import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { buscarAlunoPorId } from '../services/api'
import { buscarCep } from '../services/cepService'
import { formatarData } from '../utils/validacao'
import Mensagem from '../components/Mensagem'

const DetalhesAluno = () => {
  const { id } = useParams()

  const { data: aluno, isLoading, isError, error } = useQuery({
    queryKey: ['aluno', id],
    queryFn: ({ signal }) => buscarAlunoPorId(id, signal)
  })

  const consultaCep = useQuery({
    queryKey: ['cep', aluno?.cep],
    queryFn: ({ signal }) => buscarCep(aluno.cep, signal),
    enabled: !!aluno?.cep,
    staleTime: 1000 * 60 * 10,
    retry: 1
  })

  if (isLoading) return <div className="pagina"><p>Carregando...</p></div>
  if (isError) {
    return (
      <div className="pagina">
        <Mensagem tipo="erro" texto={`Não foi possível carregar o aluno (${error.message})`} />
        <Link to="/alunos">Voltar</Link>
      </div>
    )
  }

  return (
    <div className="pagina">
      <div className="topo-pagina">
        <h2>{aluno.nome}</h2>
        <span className={aluno.ativo ? 'status ativo' : 'status inativo'}>
          {aluno.ativo ? 'Ativo' : 'Inativo'}
        </span>
      </div>

      <div className="detalhes">
        <div className="bloco">
          <h3>Dados pessoais</h3>
          <p><b>Email:</b> {aluno.email}</p>
          <p><b>Telefone:</b> {aluno.telefone}</p>
          <p><b>Plano:</b> {aluno.plano}</p>
          <p><b>Matrícula:</b> {formatarData(aluno.dataMatricula)}</p>
        </div>

        <div className="bloco">
          <h3>Endereço <small>(via ViaCEP)</small></h3>
          {!aluno.cep && <p>Aluno sem CEP cadastrado.</p>}
          {consultaCep.isLoading && <p>Buscando endereço...</p>}
          {consultaCep.isError && <Mensagem tipo="erro" texto={consultaCep.error.message} />}
          {consultaCep.data && (
            <>
              <p><b>CEP:</b> {consultaCep.data.cep}</p>
              <p><b>Rua:</b> {consultaCep.data.logradouro || '-'}</p>
              <p><b>Bairro:</b> {consultaCep.data.bairro || '-'}</p>
              <p><b>Cidade:</b> {consultaCep.data.localidade} / {consultaCep.data.uf}</p>
              <p><b>DDD:</b> {consultaCep.data.ddd}</p>
            </>
          )}
        </div>
      </div>

      <div className="acoes">
        <Link to={`/alunos/${aluno.id}/editar`} className="botao botao-aviso">Editar</Link>
        <Link to="/alunos" className="botao botao-secundario">Voltar para a lista</Link>
      </div>
    </div>
  )
}

export default DetalhesAluno
