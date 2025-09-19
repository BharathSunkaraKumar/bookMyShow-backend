import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }
});

const showSchema = new mongoose.Schema({
  // showId: { type: String, required: true },
  time: { type: String, required: true },
  format: { type: String, required: true }, // e.g. 2D, 3D, IMAX
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true }
});

const theaterSchema = new mongoose.Schema({
  // theaterId: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  shows: [showSchema]
});

const movieSchema = new mongoose.Schema({
  // id: { type: String, required: true, unique: true }, // custom ID like "m1"
  title: { type: String, required: true },
  description: { type: String },
  genre: [{ type: String }],
  language: [{ type: String }],
  releaseDate: { type: String },
  duration: { type: Number }, // in minutes
  censorRating: { type: String }, // e.g. UA, A
  posterUrl: { type: String },
  trailerUrl: { type: String },
  director: { type: String },
  cast: [castSchema],
  formats: [{ type: String }], // 2D, IMAX, 4DX
  theaters: [theaterSchema]
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;


