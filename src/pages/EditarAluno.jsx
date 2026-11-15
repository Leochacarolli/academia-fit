import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { buscarAlunoPorId } from '../services/api'
import { useAlunos } from '../context/AlunosContext'
import AlunoForm from '../components/AlunoForm'
import Mensagem from '../components/Mensagem'

const EditarAluno = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { editar, mensagem } = useAlunos()

  const { data: aluno, isLoading, isError, error } = useQuery({
    queryKey: ['aluno', id],
    queryFn: ({ signal }) => buscarAlunoPorId(id, signal)
  })

  const salvar = async (dados) => {
    const deuCerto = await editar(Number(id), dados)
    if (deuCerto) {
      queryClient.invalidateQueries({ queryKey: ['aluno', id] })
      navigate(`/alunos/${id}`)
    }
  }

  if (isLoading) return <div className="pagina"><p>Carregando aluno...</p></div>
  if (isError) return <div className="pagina"><Mensagem tipo="erro" texto={`Erro: ${error.message}`} /></div>

  return (
    <div className="pagina">
      <h2>Editar aluno: {aluno.nome}</h2>
      {mensagem && <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} />}
      <AlunoForm alunoInicial={aluno} onSalvar={salvar} textoBotao="Salvar alterações" />
    </div>
  )
}

export default EditarAluno
