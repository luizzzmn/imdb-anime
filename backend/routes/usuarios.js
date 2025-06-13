import express from 'express';

// importando funções do controller
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

// definindo qual rota chamará qual função
router.get('/', listarUsuarios);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);
router.post('/login', loginUsuario);

export default router;