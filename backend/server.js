import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
const produtos = client.db(process.env.DB_NAME || 'atividade_react').collection('produtos')

app.get('/produtos', async (req, res) => {
  try {
    const lista = await produtos.find().sort({ produto: 1 }).toArray()
    res.json(lista)
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' })
  }
})

app.post('/produtos', async (req, res) => {
  try {
    const { produto, preco, tags, fornecedor } = req.body ?? {}

    if (typeof produto !== 'string' || produto.trim() === '' || typeof preco !== 'number') {
      return res.status(400).json({ erro: 'Informe "produto" (texto) e "preco" (número)' })
    }

    const novo = { produto: produto.trim(), preco, tags: tags ?? [] }
    if (fornecedor) novo.fornecedor = fornecedor

    const resultado = await produtos.insertOne(novo)
    res.status(201).json({ ...novo, _id: resultado.insertedId })
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao criar produto' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API em http://localhost:${PORT}/produtos`))