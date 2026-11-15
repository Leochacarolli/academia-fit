import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const buscarAlunos = async () => {
  const resposta = await api.get('/alunos')
  return resposta.data
}

export const criarAluno = async (aluno) => {
  const { nome, email, telefone, plano, cep, ativo } = aluno
  const novoAluno = {
    nome,
    email,
    telefone,
    plano,
    cep,
    ativo,
    dataMatricula: new Date().toISOString().slice(0, 10)
  }
  const resposta = await api.post('/alunos', novoAluno)
  return resposta.data
}

export const atualizarAluno = async (id, dados) => {
  const { id: _ignorar, ...resto } = dados
  const resposta = await api.put(`/alunos/${id}`, { ...resto })
  return resposta.data
}

export const deletarAluno = async (id) => {
  await api.delete(`/alunos/${id}`)
  return id
}

export default api
