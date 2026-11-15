import { useEffect, useState } from 'react'
import useForm from '../hooks/useForm'
import { validarAluno, planos } from '../utils/validacao'
import Botao from './Botao'

const valoresPadrao = {
  nome: '',
  email: '',
  telefone: '',
  plano: '',
  cep: '',
  ativo: true
}

const AlunoForm = ({ alunoInicial, onSalvar, textoBotao = 'Salvar' }) => {
  const { valores, setValores, erros, handleChange, validarFormulario } = useForm(
    alunoInicial || valoresPadrao,
    validarAluno
  )
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (alunoInicial) {
      setValores(alunoInicial)
    }
  }, [alunoInicial])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setSalvando(true)
    await onSalvar({ ...valores, cep: valores.cep.replace(/\D/g, '') })
    setSalvando(false)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor="nome">Nome completo *</label>
        <input id="nome" name="nome" value={valores.nome} onChange={handleChange} placeholder="Ex: Maria da Silva" />
        {erros.nome && <span className="erro-campo">{erros.nome}</span>}
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={valores.email} onChange={handleChange} placeholder="maria@email.com" />
          {erros.email && <span className="erro-campo">{erros.email}</span>}
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone *</label>
          <input id="telefone" name="telefone" value={valores.telefone} onChange={handleChange} placeholder="(11) 99999-9999" />
          {erros.telefone && <span className="erro-campo">{erros.telefone}</span>}
        </div>
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="plano">Plano *</label>
          <select id="plano" name="plano" value={valores.plano} onChange={handleChange}>
            <option value="">Selecione...</option>
            {planos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {erros.plano && <span className="erro-campo">{erros.plano}</span>}
        </div>

        <div className="campo">
          <label htmlFor="cep">CEP</label>
          <input id="cep" name="cep" value={valores.cep} onChange={handleChange} placeholder="00000000" maxLength={9} />
          {erros.cep && <span className="erro-campo">{erros.cep}</span>}
        </div>
      </div>


      <label className="checkbox">
        <input type="checkbox" name="ativo" checked={valores.ativo} onChange={handleChange} />
        Aluno ativo
      </label>

      <Botao type="submit" disabled={salvando}>
        {salvando ? 'Salvando...' : textoBotao}
      </Botao>
    </form>
  )
}

export default AlunoForm
