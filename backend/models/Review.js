import mongoose from "mongoose";

const collection_name = "reviews";

const reviewSchema = new mongoose.Schema({
    reviewer_id: { type: String, required: true },
    anime_id:    { type: String, required: true },
    review:      { type: String },
    nota:        { type: Number },
    likes:       Number,
    deslikes:    Number,
    respostas:   [ String ],
    createdAt:   { type: Date,   default: Date.now }
});

export default mongoose.model(collection_name,reviewSchema);