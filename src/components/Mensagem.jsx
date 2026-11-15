const Mensagem = ({ tipo, texto }) => {
  if (!texto) return null

  return (
    <div className={`mensagem mensagem-${tipo}`}>
      {tipo === 'sucesso' ? '✔ ' : '✖ '}
      {texto}
    </div>
  )
}

export default Mensagem
