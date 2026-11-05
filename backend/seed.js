import 'dotenv/config'
import { MongoClient } from 'mongodb'

const dados = [
  { produto: 'Café', preco: 12.5, tags: ['quente', 'manhã'], fornecedor: { nome: 'CoopeCafé', cidade: 'Dourados' } },
  { produto: 'Pão de queijo', preco: 6.9, tags: ['salgado', 'lanche'], fornecedor: { nome: 'Padaria Minas', cidade: 'Campo Grande' } },
  { produto: 'Suco de laranja', preco: 8, tags: ['gelado', 'natural'] },
  { produto: 'Bolo de cenoura', preco: 9.75, tags: ['doce', 'lanche'], fornecedor: { nome: 'Doces da Vó', cidade: 'Dourados' } },
  { produto: 'Chá de camomila', preco: 5.5, tags: ['quente', 'noite'] },
  { produto: 'Torta de limão', preco: 11.3, tags: ['doce', 'gelado'], fornecedor: { nome: 'Doces da Vó', cidade: 'Dourados' } }
]

const client = new MongoClient(process.env.MONGODB_URI)

try {
  await client.connect()
  const col = client.db(process.env.DB_NAME || 'atividade_react').collection('produtos')
  await col.deleteMany({})
  const res = await col.insertMany(dados)
  console.log(`${res.insertedCount} produtos inseridos`)
} catch (e) {
  console.error('Erro:', e.message)
} finally {
  await client.close()
}