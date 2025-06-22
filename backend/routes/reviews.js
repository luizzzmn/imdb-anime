import express from 'express';
import {
    listarReviews,
    getReviewById,
    getReviewsByReviewer,
    getReviewsByAnime,
    getReviewsByDate,
    getReviewsByNota,
    postarReview,
    atualizarReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', listarReviews);
router.get('/:id', getReviewById);
router.get('/reviewer/:reviewer_id', getReviewsByReviewer); 
router.get('/anime/:anime_id', getReviewsByAnime);
router.get('/date/:date', getReviewsByDate); // reviews por data (YYYY-MM-DD)
router.get('/nota/:nota', getReviewsByNota);
router.post('/', postarReview);
router.put('/:id', atualizarReview);

export default router;