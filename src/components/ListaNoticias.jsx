// PASO 3. Importa useEffect y useState desde "react"

// PASO 3. Importa axios

// PASO 3. Crea la constante URL_ARTICULOS

function ListaNoticias({ seleccionado, onSeleccionar }) {
  // PASO 3. Crea los estados articulos, cargando y error

  // PASO 3. Llama a cargarArticulos cuando el componente abre

  // PASO 3. Escribe la función cargarArticulos con axios

  return (
    <section>
      <h2>Artículos</h2>

      {/* PASO 3. Muestra el error, si existe */}

      {/* PASO 3. Si cargando es true, muestra "Cargando noticias..." */}

      <ul className="lista">
        {/* PASO 3. Recorre articulos y pinta cada tarjeta */}
      </ul>
    </section>
  )
}

// PASO 3. Escribe la función formatearFecha

export default ListaNoticias
