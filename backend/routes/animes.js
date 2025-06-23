import express from 'express';
import {
    getAnimeByMalID,
    getAnimeByTitulo,
    getAnimesByGenero,
    getAnimes,
    getAnimeByAno,
    getAllCorrespondencies
} from '../controllers/animeController.js';


const router = express.Router();

router.get('/', getAnimes);
router.get('/id/:id', getAnimeByMalID);
router.get('/titulo/:titulo', getAnimeByTitulo);
router.get('/titulos/:titulo', getAllCorrespondencies);
router.get('/genero/:genero', getAnimesByGenero);
router.get('/ano/:ano', getAnimeByAno);

export default router;