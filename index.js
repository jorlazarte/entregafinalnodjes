import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import apiRouter from './src/routes/api.router.js';
import {authMiddleware} from './src/middlewares/auth.middleware.js';

dotenv.config()

const PORT = process.env.PORT || 4000;

const app = express()
app.use(express.json()) //así en el controlador puedo usar req.body
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/api", apiRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))