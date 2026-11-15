import { useState } from 'react'

const useForm = (valoresIniciais, validar) => {
  const [valores, setValores] = useState(valoresIniciais)
  const [erros, setErros] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValores({
      ...valores,
      [name]: type === 'checkbox' ? checked : value
    })
    if (erros[name]) {
      setErros({ ...erros, [name]: null })
    }
  }

  const validarFormulario = () => {
    const errosEncontrados = validar ? validar(valores) : {}
    setErros(errosEncontrados)
    return Object.keys(errosEncontrados).length === 0
  }

  const resetar = () => {
    setValores(valoresIniciais)
    setErros({})
  }

  return { valores, setValores, erros, handleChange, validarFormulario, resetar }
}

export default useForm
