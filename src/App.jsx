import { useEffect, useState } from "react"
import "./App.css"

// PASO 4. Importa axios

const URL_ARTICULOS = "https://api.spaceflightnewsapi.net/v4/articles/?limit=6"

// PASO 4. Crea la constante URL_GEMINI

function App() {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [seleccionado, setSeleccionado] = useState(null)

  // PASO 4. Crea los estados pregunta, respuesta y consultando

  useEffect(() => {
    cargarArticulos()
  }, [])

  async function cargarArticulos() {
    try {
      setCargando(true)
      setError("")
      const respuestaHttp = await fetch(URL_ARTICULOS)
      if (!respuestaHttp.ok) {
        throw new Error("No se pudieron cargar las noticias")
      }
      const datos = await respuestaHttp.json()
      setArticulos(datos.results)
    } catch (err) {
      setError("No hubo conexión con el API de noticias. Revisa tu internet.")
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  // PASO 4. Escribe la función preguntar

  return (
    <div className="pagina">
      <header className="encabezado">
        <img
          className="logo"
          src="https://pascualbravo.edu.co/wp-content/uploads/2023/06/cropped-Imagotipo-horizontal_acreditados.png"
          alt="Institución Universitaria Pascual Bravo"
        />
        <p className="etiqueta">Laboratorio · Consumo de APIs</p>
        <h1>Noticias Pascual Bravo</h1>
        <p>Elige una noticia y pregúntale a Gemini.</p>
      </header>

      {error && <p className="aviso">{error}</p>}

      <main className="contenido">
        <section>
          <h2>Artículos</h2>
          {cargando && <p>Cargando noticias...</p>}
          <ul className="lista">
            {articulos.map((articulo) => (
              <li key={articulo.id}>
                <button
                  type="button"
                  className={seleccionado?.id === articulo.id ? "tarjeta activa" : "tarjeta"}
                  onClick={() => setSeleccionado(articulo)}
                >
                  {articulo.image_url && <img src={articulo.image_url} alt="" />}
                  <span className="medio">{articulo.news_site}</span>
                  <strong>{articulo.title}</strong>
                  <span className="fecha">{formatearFecha(articulo.published_at)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="panel">
          <h2>Pregunta a Gemini</h2>
          {seleccionado ? (
            <>
              <h3>{seleccionado.title}</h3>
              <p>{seleccionado.summary}</p>
              <a href={seleccionado.url} target="_blank" rel="noreferrer">
                Leer la noticia completa
              </a>
            </>
          ) : (
            <p>Selecciona un artículo de la lista.</p>
          )}

          {/* PASO 4. Formulario de la pregunta */}

          {/* PASO 4. Párrafo con la respuesta */}
        </aside>
      </main>
    </div>
  )
}

// PASO 4. Escribe la función leerTexto

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default App
