import express from 'express';
import {
    getAnimeByMalID,
    getAnimeByTitulo,
    getAnimesByGenero,
    getAnimes,
    getAnimeByAno,
    getAllCorrespondencies,
    updateAnime
} from '../controllers/animeController.js';


const router = express.Router();

router.get('/', getAnimes);
router.get('/:id', getAnimeByMalID);
router.get('/titulo/:titulo', getAnimeByTitulo);
router.get('/titulos/:titulo', getAllCorrespondencies);
router.get('/genero/:genero', getAnimesByGenero);
router.get('/ano/:ano', getAnimeByAno);

router.put('/:id', updateAnime);

export default router;