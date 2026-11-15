import { Link } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material'
import Botao from './Botao'

const TabelaAlunos = ({ alunos, onExcluir }) => {
  if (alunos.length === 0) {
    return <p className="vazio">Nenhum aluno encontrado 😕</p>
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow className="cabecalho-tabela">
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Plano</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alunos.map((aluno) => (
            <TableRow key={aluno.id} hover>
              <TableCell>
                <Link to={`/alunos/${aluno.id}`} className="link-nome">{aluno.nome}</Link>
              </TableCell>
              <TableCell>{aluno.email}</TableCell>
              <TableCell>{aluno.telefone}</TableCell>
              <TableCell>{aluno.plano}</TableCell>
              <TableCell>
                <Chip
                  label={aluno.ativo ? 'Ativo' : 'Inativo'}
                  color={aluno.ativo ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <div className="acoes">
                  <Link to={`/alunos/${aluno.id}`}>
                    <Botao variante="secundario">Ver</Botao>
                  </Link>
                  <Link to={`/alunos/${aluno.id}/editar`}>
                    <Botao variante="aviso">Editar</Botao>
                  </Link>
                  <Botao variante="perigo" onClick={() => onExcluir(aluno)}>
                    Excluir
                  </Botao>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TabelaAlunos
