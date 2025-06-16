import express from 'express';
import {
    getAnimeByMalID,
    getAnimeByTitulo,
    getAnimesByGenero,
    getAnimes,
    getAnimeByAno
} from '../controllers/animeController.js';


const router = express.Router();

router.get('/', getAnimes);
router.get('/:id', getAnimeByMalID);
router.get('/:titulo', getAnimeByTitulo);
router.get('/:genero', getAnimesByGenero);
router.get('/:ano', getAnimeByAno);

export default router;