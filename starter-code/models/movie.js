const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: {
        type: String,
        enum: ["action", "crime", "drama", "comedy", "other"],
    },
    plot: String,
});

const Movie = mongoose.model("Movies", movieSchema);

module.exports = Movie;