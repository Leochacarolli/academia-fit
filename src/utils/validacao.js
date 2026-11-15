export const validarAluno = ({ nome, email, telefone, plano, cep }) => {
  const erros = {}

  if (!nome || nome.trim().length < 3) {
    erros.nome = 'O nome precisa ter pelo menos 3 letras'
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    erros.email = 'Digite um email válido'
  }

  if (!telefone || telefone.replace(/\D/g, '').length < 10) {
    erros.telefone = 'Telefone inválido (coloque o DDD)'
  }

  if (!plano) {
    erros.plano = 'Escolha um plano'
  }

  if (cep && cep.replace(/\D/g, '').length !== 8) {
    erros.cep = 'O CEP tem que ter 8 números'
  }

  return erros
}

export const planos = ['Mensal', 'Trimestral', 'Semestral', 'Anual']

export const formatarData = (data) => {
  if (!data) return '-'
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}
