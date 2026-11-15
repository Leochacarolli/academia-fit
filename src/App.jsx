import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RotaPrivada from './components/RotaPrivada'
import Home from './pages/Home'
import Login from './pages/Login'
import ListaAlunos from './pages/ListaAlunos'
import NovoAluno from './pages/NovoAluno'
import EditarAluno from './pages/EditarAluno'
import DetalhesAluno from './pages/DetalhesAluno'
import NaoEncontrada from './pages/NaoEncontrada'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/alunos" element={<RotaPrivada><ListaAlunos /></RotaPrivada>} />
          <Route path="/alunos/novo" element={<RotaPrivada><NovoAluno /></RotaPrivada>} />
          <Route path="/alunos/:id" element={<RotaPrivada><DetalhesAluno /></RotaPrivada>} />
          <Route path="/alunos/:id/editar" element={<RotaPrivada><EditarAluno /></RotaPrivada>} />

          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <footer>Academia FitPro © 2026 - Projeto de React</footer>
    </>
  )
}

export default App
