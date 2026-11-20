import "./App.css"

// PASO 3. Importa useEffect y useState desde "react"

// PASO 3. Importa axios

// PASO 5. Importa GoogleGenAI desde "@google/genai"

// PASO 3. Crea la constante URL_ARTICULOS

function App() {
  // PASO 3. Crea los estados articulos, cargando, error y seleccionado

  // PASO 5. Crea los estados pregunta, respuesta y consultando

  // PASO 3. Llama a cargarArticulos cuando la página abre

  // PASO 3. Escribe la función cargarArticulos con axios

  // PASO 5. Escribe la función preguntar con GoogleGenAI

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

      {/* PASO 3. Muestra el error, si existe */}

      <main className="contenido">
        <section>
          <h2>Artículos</h2>
          {/* PASO 3. Si cargando es true, muestra "Cargando noticias..." */}
          <ul className="lista">
            {/* PASO 3. Recorre articulos y pinta cada tarjeta */}
          </ul>
        </section>

        <aside className="panel">
          <h2>Pregunta a Gemini</h2>
          {/* PASO 3. Muestra la noticia elegida o "Selecciona un artículo de la lista." */}

          {/* PASO 5. Formulario de la pregunta */}

          {/* PASO 5. Párrafo con la respuesta */}
        </aside>
      </main>
    </div>
  )
}

// PASO 3. Escribe la función formatearFecha

export default App
