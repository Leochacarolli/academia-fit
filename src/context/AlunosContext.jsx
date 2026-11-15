import { createContext, useContext, useEffect, useState } from 'react'
import { buscarAlunos, criarAluno, atualizarAluno, deletarAluno } from '../services/api'

const AlunosContext = createContext()

export const AlunosProvider = ({ children }) => {
  const [alunos, setAlunos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [mensagem, setMensagem] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    buscarAlunos(controller.signal)
      .then((dados) => {
        setAlunos(dados)
        setErro(null)
      })
      .catch((e) => {
        if (e.name === 'CanceledError' || e.name === 'AbortError') {
          console.log('requisição cancelada')
          return
        }
        console.log(e)
        setErro('Não foi possível carregar os alunos. O json-server está rodando?')
      })
      .finally(() => setCarregando(false))

    return () => controller.abort()
  }, [])

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto })
    setTimeout(() => setMensagem(null), 3000)
  }

  const adicionar = async (aluno) => {
    try {
      const novo = await criarAluno(aluno)
      setAlunos([...alunos, novo])
      mostrarMensagem('sucesso', `Aluno ${novo.nome} cadastrado com sucesso!`)
      return true
    } catch (e) {
      console.log(e)
      mostrarMensagem('erro', `Erro ao cadastrar: ${e.message}`)
      return false
    }
  }

  const editar = async (id, dados) => {
    try {
      const atualizado = await atualizarAluno(id, dados)
      setAlunos(alunos.map((a) => (a.id === atualizado.id ? atualizado : a)))
      mostrarMensagem('sucesso', `Dados de ${atualizado.nome} atualizados!`)
      return true
    } catch (e) {
      console.log(e)
      mostrarMensagem('erro', `Erro ao atualizar: ${e.message}`)
      return false
    }
  }

  const remover = async (aluno) => {
    const confirmou = window.confirm(`Tem certeza que deseja excluir o aluno "${aluno.nome}"?`)
    if (!confirmou) return

    try {
      await deletarAluno(aluno.id)
      setAlunos(alunos.filter((a) => a.id !== aluno.id))
      mostrarMensagem('sucesso', `Aluno ${aluno.nome} foi excluído.`)
    } catch (e) {
      console.log(e)
      mostrarMensagem('erro', `Erro ao excluir: ${e.message}`)
    }
  }

  return (
    <AlunosContext.Provider
      value={{ alunos, carregando, erro, mensagem, adicionar, editar, remover }}
    >
      {children}
    </AlunosContext.Provider>
  )
}

export const useAlunos = () => useContext(AlunosContext)
