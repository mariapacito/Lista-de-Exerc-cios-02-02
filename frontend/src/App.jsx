import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/produtos'

export default function App() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch(API_URL)

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()

        setItens(json.data ?? json)
      } catch (e) {
        setErro('Falha ao carregar os produtos')
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [])

  return (
    <main className="pagina">
      <h1>Catálogo de Produtos</h1>
      <p className="url">GET {API_URL}</p>

      {carregando && <p className="aviso">Carregando...</p>}
      {erro && <p className="aviso erro">{erro}</p>}
      {!carregando && !erro && itens.length === 0 && (
        <p className="aviso">Nenhum produto encontrado.</p>
      )}

      <div className="grade">
        {itens.map(item => (
          <article className="card" key={item._id ?? item.id}>
            <h2>{item.produto}</h2>
            <p className="preco">R$ {Number(item.preco).toFixed(2).replace('.', ',')}</p>

            {item.tags && (
              <ul className="tags">
                {item.tags.map(tag => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}

            {item.fornecedor && (
              <p className="fornecedor">
                {item.fornecedor.nome} · {item.fornecedor.cidade}
              </p>
            )}

            <small className="id">{item._id ? '_id' : 'id'}: {item._id ?? item.id}</small>
          </article>
        ))}
      </div>
    </main>
  )
}