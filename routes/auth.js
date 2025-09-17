import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/register', async(req, res) => {
    try {
        const {username, email, password} = req.body;

        const existUser = await User.findOne({email})
        if(existUser) return res.status(400).json({message: "User already exist"})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username, 
            email,
            password: hashedPassword
        })
        console.log(newUser)
        await newUser.save()
        res.send(201).json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// router.get('/', async(req, res) => {
//     try {
//         const users = await User.find().populate('username email')
//         res.json(users)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message: "User not found"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.json({
            token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router