import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

// Promise.race: se a API demorar mais que o tempo, rejeita com timeout
export const comTimeout = (promessa, tempo = 8000) => {
  const timer = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('A requisição demorou demais (timeout)')), tempo)
  })
  return Promise.race([promessa, timer])
}

export const buscarAlunos = async (signal) => {
  const resposta = await comTimeout(api.get('/alunos', { signal }))
  return resposta.data
}

export const buscarAlunoPorId = async (id, signal) => {
  const resposta = await comTimeout(api.get(`/alunos/${id}`, { signal }))
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
  const resposta = await comTimeout(api.post('/alunos', novoAluno))
  return resposta.data
}

export const atualizarAluno = async (id, dados) => {
  const { id: _ignorar, ...resto } = dados
  const resposta = await comTimeout(api.put(`/alunos/${id}`, { ...resto }))
  return resposta.data
}

export const deletarAluno = async (id) => {
  await comTimeout(api.delete(`/alunos/${id}`))
  return id
}

export default api
