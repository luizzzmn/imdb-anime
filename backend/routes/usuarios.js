import express from 'express';
import {
  listarUsuarios,
  criarUsuario,
  getUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
  toggleFavorito,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario);
router.get('/:id', getUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);
router.post('/login', loginUsuario);
router.patch('/:id/favoritos', toggleFavorito);

export default router;
