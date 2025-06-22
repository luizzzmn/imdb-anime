import Review from "../models/Review.js";

// get todas as reviews
export const listarReviews = async function (req, res) {
    const reviews = await Review.find();
    res.status(200).json(reviews);
}

// get review pelo id (da própria review)
export const getReviewById = async function (req, res) {
    const id = req.params.id;
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send("Review não encontrada");
        res.status(200).json(review);
    } catch (err) {
        res.status(500).send("Erro ao buscar review por ID");
    }
};

// get reviews pelo id do reviewer
export const getReviewsByReviewer = async function (req, res) {
    const reviewer_id = req.params.reviewer_id;
    try {
        const reviews = await Review.find({ reviewer_id });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send("Erro ao buscar reviews por reviewer_id");
    }
};

// get reviews pelo id do anime avaliado
export const getReviewsByAnime = async function (req, res) {
    const anime_id = req.params.anime_id;
    try {
        const reviews = await Review.find({ anime_id });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send("Erro ao buscar reviews por anime_id");
    }
};

// get reviews por data (todas as reviews criadas em uma data específica)
export const getReviewsByDate = async function (req, res) {
    const date = req.params.date; // formato esperado: "YYYY-MM-DD"
    try {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);
        const reviews = await Review.find({
            createdAt: { $gte: start, $lt: end }
        });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send("Erro ao buscar reviews por data");
    }
};

// get reviews por nota
export const getReviewsByNota = async function (req, res) {
    const nota = Number(req.params.nota);
    try {
        const reviews = await Review.find({ nota });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).send("Erro ao buscar reviews por nota");
    }
};

// criar uma review
export const postarReview = async function (req, res) {
    const review = req.body;

    try {
        const reviewCriada = await Review.create(review);
        res.status(201).json(reviewCriada);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar a review no banco de dados.")
    }
};

// atualizar uma review
export const atualizarReview = async function (req, res) {
    const id = req.params.id;
    const novosDados = req.body;

    try {
        const reviewAtualizada = await Review.findByIdAndUpdate(id, novosDados, { new: true });
        if (!reviewAtualizada) return res.status(404).send("Review não encontrada");
        res.status(200).json(reviewAtualizada);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar a review no banco de dados.");
    }
};