import express from 'express';
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
  toggleFavorito,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);
router.post('/login', loginUsuario);
router.patch('/:id/favoritos', toggleFavorito); // <-- ADICIONAR

export default router;
