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

export default router;