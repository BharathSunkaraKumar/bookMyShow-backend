import express from 'express'
import Movie from '../models/Movies.js'
const router = express.Router()

router.post('/movies', async(req, res) => {
    try {
        // console.log(req.body)
        const newMovie = new Movie(req.body)
        const savedMovie = await newMovie.save()
        res.send(201).json(savedMovie)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/movies', async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/movies/:id', async(req, res) => {
    try {
        const {id} = req.params
        const movie = await Movie.findById(id)
        res.json(movie);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:movieId/theaters/:theaterId', async(req, res) => {
    try {
        const {movieId, theaterId} = req.params;
        const movie = await Movie.findById(movieId)

        if(!movie) return res.status(404).json({message: "Movie not found"})
        const theatre = movie.theaters.id(theaterId)
        if(!theatre) return res.status(404).json({message: "Theatre not found"})
        res.json(theatre)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;