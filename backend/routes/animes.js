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
router.get('/id/:id', getAnimeByMalID);
router.get('/titulo/:titulo', getAnimeByTitulo);
router.get('/genero/:genero', getAnimesByGenero);
router.get('/ano/:ano', getAnimeByAno);

export default router;