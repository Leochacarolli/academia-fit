import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material'
import Botao from './Botao'

const TabelaAlunos = ({ alunos, onEditar, onExcluir }) => {
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
                <b>{aluno.nome}</b>
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
                  <Botao variante="aviso" onClick={() => onEditar(aluno)}>
                    Editar
                  </Botao>
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
