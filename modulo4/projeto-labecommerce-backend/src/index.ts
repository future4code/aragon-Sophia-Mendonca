import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ping } from './endpoints/ping'
import { createUser } from './endpoints/CreateUser'
import { searchUsers } from './endpoints/searchUsers'
import { registerProduct } from './endpoints/RegisterProduct'
import { searchProducts } from './endpoints/searchProducts'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get("/ping", ping)

app.post("/users", createUser)

app.get("/users", searchUsers)

app.post("/products", registerProduct)

app.get("/products", searchProducts)