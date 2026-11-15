export const buscarCep = async (cep, signal) => {
  const cepLimpo = String(cep).replace(/\D/g, '')

  if (cepLimpo.length !== 8) {
    throw new Error('CEP precisa ter 8 números')
  }

  const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, { signal })

  if (!resposta.ok) {
    throw new Error('Erro ao consultar o CEP')
  }

  const dados = await resposta.json()

  if (dados.erro) {
    throw new Error(`CEP ${cepLimpo} não encontrado`)
  }

  return dados
}
