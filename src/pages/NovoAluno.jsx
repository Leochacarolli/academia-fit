import { useNavigate } from 'react-router-dom'
import { useAlunos } from '../context/AlunosContext'
import AlunoForm from '../components/AlunoForm'
import Mensagem from '../components/Mensagem'

const NovoAluno = () => {
  const { adicionar, mensagem } = useAlunos()
  const navigate = useNavigate()

  const salvar = async (aluno) => {
    const deuCerto = await adicionar(aluno)
    if (deuCerto) {
      navigate('/alunos')
    }
  }

  return (
    <div className="pagina">
      <h2>Cadastrar novo aluno</h2>
      {mensagem && <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} />}
      <AlunoForm onSalvar={salvar} textoBotao="Cadastrar" />
    </div>
  )
}

export default NovoAluno
