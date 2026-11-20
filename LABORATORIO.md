# Práctica consumo APIs

**Programación Web**

![Institución Universitaria Pascual Bravo](https://pascualbravo.edu.co/wp-content/uploads/2023/06/cropped-Imagotipo-horizontal_acreditados.png)

## Integrantes

Escribe aquí el nombre completo de cada estudiante. Con esta sección se identifica la entrega.

- 

- 

**No hay necesidad de usar IA. Solo hay que seguir los pasos de este laboratorio.**

## Objetivo

Consumir el API de Gemini con Axios en la aplicación React, para formular una pregunta sobre la noticia espacial seleccionada. La lista de artículos ya está obtenida con `fetch`.

La lista de noticias ya funciona. En este laboratorio vas a instalar Axios y a conectarla con Gemini para preguntar sobre la noticia elegida.

| Tiempo | Qué hacemos |
| --- | --- |
| 0:00 – 0:10 | Hacer fork o clonar, e instalar el proyecto |
| 0:10 – 0:18 | Leer cómo está hecha la lista con `fetch` |
| 0:18 – 0:28 | Crear la llave de Gemini y guardarla |
| 0:28 – 0:33 | Instalar Axios |
| 0:33 – 0:50 | Pegar el consumo de Gemini |
| 0:50 – 0:58 | Probar |
| 0:58 – 1:05 | Escribir los nombres y subir el código |

## Paso 0. Traer el proyecto

Entra al repositorio que compartió el docente. Para poder subir tu entrega, trabaja sobre **tu copia**.

**Fork, y luego clonar.** Es el camino para entregar.

1. Inicia sesión en https://github.com
2. Abre el repositorio del docente y pulsa **Fork**.
3. En tu copia, pulsa **Code** y copia la dirección HTTPS. Lleva tu usuario, no el del docente.
4. En tu computador:

```bash
git clone PEGA_AQUI_LA_URL_DE_TU_FORK
cd lab-consumo-apis
npm install
npm run dev
```

**Solo clonar.** Sirve para trabajar, pero GitHub no te deja hacer push al repositorio del docente. Si empezaste así, al final crea un repositorio vacío en tu cuenta, sin README, y cambia el destino:

```bash
git clone PEGA_AQUI_LA_URL_DEL_DOCENTE
cd lab-consumo-apis
npm install
git remote set-url origin PEGA_AQUI_LA_URL_DE_TU_REPOSITORIO
```

Abre `src/App.jsx`. Lo que no tiene comentario ya está resuelto. Cada comentario `PASO 4` es un hueco: bórralo y pega ahí el código de ese punto.

## Cómo está construida la lista (fetch)

Spaceflight News es un API público. No pide llave. Esta dirección devuelve 6 artículos:

`https://api.spaceflightnewsapi.net/v4/articles/?limit=6`

La respuesta trae un objeto. La lista vive en `results`. Cada noticia tiene `id`, `title`, `summary`, `image_url`, `news_site`, `url` y `published_at`.

En `src/App.jsx` esa parte ya está escrita con `fetch`. Léela de arriba hacia abajo:

1. `URL_ARTICULOS` guarda la dirección.
2. `useState` crea cuatro datos: `articulos`, `cargando`, `error` y `seleccionado`.
3. `useEffect` llama a `cargarArticulos()` una sola vez, al abrir la página. El `[]` del final significa "solo al inicio".
4. `cargarArticulos` pide el API y guarda la lista:

```jsx
const respuestaHttp = await fetch(URL_ARTICULOS)
if (!respuestaHttp.ok) {
  throw new Error("No se pudieron cargar las noticias")
}
const datos = await respuestaHttp.json()
setArticulos(datos.results)
```

`fetch` entrega la respuesta cruda. Por eso hay dos pasos extra: revisar `ok` y convertir el cuerpo con `.json()`.

5. `articulos.map` pinta una tarjeta por noticia. El `onClick` guarda esa noticia en `seleccionado`.
6. El panel derecho muestra `seleccionado.title` y `seleccionado.summary`. Si no hay nada elegido, pide seleccionar un artículo.

Arranca el proyecto y comprueba que las tarjetas cargan antes de seguir:

```bash
npm run dev
```

## Paso 1. Crear la llave de Gemini (10 min)

1. Entra a https://aistudio.google.com/ con un correo de Gmail, puede ser el de la Universidad.
2. Abre https://aistudio.google.com/api-keys
3. Pulsa **Create API key** y copia la llave. Empieza por `AIza`.

Déjala solo en tu computador. No la pegues en el chat del curso ni en GitHub.

## Paso 2. Guardar la llave

En la raíz del proyecto, abre `.env`. Si no existe, créalo. Una línea, sin comillas:

```
VITE_GEMINI_API_KEY=AIza_tu_llave
```

El nombre empieza por `VITE_` para que React pueda leerla. Si `npm run dev` ya estaba abierto, detenlo y vuélvelo a iniciar.

## Paso 3. Instalar Axios

En la terminal del proyecto:

```bash
npm install axios
```

Axios también pide APIs, pero el JSON llega listo en `respuesta.data`. Si el API responde con error, Axios entra al `catch`. Con `fetch` esos dos pasos los escribes tú.

## Paso 4. Pegar el consumo de Gemini

Gemini recibe un `POST` en:

`https://generativelanguage.googleapis.com/v1beta/interactions`

El cuerpo lleva el modelo y el texto. La llave va en el encabezado `x-goog-api-key`.

Sigue en `src/App.jsx`. En cada punto, borra el comentario y deja el código.

**Import.** Reemplaza el comentario `PASO 4. Importa axios`:

```jsx
import axios from "axios"
```

**Dirección.** Reemplaza el comentario de `URL_GEMINI`:

```jsx
const URL_GEMINI = "https://generativelanguage.googleapis.com/v1beta/interactions"
```

**Estados.** Reemplaza el comentario de los estados, debajo de `seleccionado`:

```jsx
const [pregunta, setPregunta] = useState("Explícame esta noticia en palabras sencillas")
const [respuesta, setRespuesta] = useState("")
const [consultando, setConsultando] = useState(false)
```

**Función.** Reemplaza el comentario de `preguntar`, dentro de `App`:

```jsx
async function preguntar(evento) {
  evento.preventDefault()

  if (!seleccionado) {
    setError("Elige una noticia antes de preguntar.")
    return
  }

  const llave = import.meta.env.VITE_GEMINI_API_KEY
  if (!llave) {
    setError("Falta la llave en el archivo .env. Agrégala y reinicia npm run dev.")
    return
  }

  const prompt = [
    "Responde en español, en un párrafo corto y claro.",
    `Título: ${seleccionado.title}`,
    `Resumen: ${seleccionado.summary}`,
    `Pregunta: ${pregunta}`,
  ].join("\n")

  try {
    setConsultando(true)
    setError("")
    setRespuesta("")

    const respuesta = await axios.post(
      URL_GEMINI,
      {
        model: "gemini-flash-latest",
        input: prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": llave,
        },
      }
    )

    const texto = leerTexto(respuesta.data)
    if (!texto) {
      console.log(respuesta.data)
      throw new Error("Gemini respondió sin texto. Revisa la consola del navegador.")
    }
    setRespuesta(texto)
  } catch (err) {
    setError(err.response?.data?.error?.message || err.message || "No se pudo consultar a Gemini.")
  } finally {
    setConsultando(false)
  }
}
```

`axios.post` recibe tres cosas: la dirección, el cuerpo y las opciones. El JSON de Gemini queda en `respuesta.data`.

**Leer el texto.** Fuera de `App`, reemplaza el comentario de `leerTexto`:

```jsx
function leerTexto(datos) {
  if (typeof datos.output_text === "string" && datos.output_text.trim()) {
    return datos.output_text.trim()
  }

  const pasos = Array.isArray(datos.steps) ? datos.steps : []
  const textos = []

  for (const paso of pasos) {
    if (paso.type !== "model_output" || !Array.isArray(paso.content)) continue
    for (const parte of paso.content) {
      if (parte.type === "text" && parte.text) textos.push(parte.text)
    }
  }

  return textos.join("\n").trim()
}
```

**Formulario.** Dentro del `<aside>`, reemplaza el comentario del formulario:

```jsx
<form onSubmit={preguntar}>
  <label htmlFor="pregunta">Tu pregunta</label>
  <textarea
    id="pregunta"
    value={pregunta}
    onChange={(evento) => setPregunta(evento.target.value)}
    rows={3}
  />
  <button type="submit" disabled={consultando || !seleccionado}>
    {consultando ? "Consultando..." : "Preguntar"}
  </button>
</form>
```

**Respuesta.** Reemplaza el comentario del párrafo:

```jsx
{respuesta && (
  <div className="respuesta">
    <h3>Respuesta</h3>
    <p>{respuesta}</p>
  </div>
)}
```

**Al cambiar de noticia.** En la tarjeta, el `onClick` hoy solo guarda el artículo. Cámbialo por este, para borrar la respuesta anterior:

```jsx
onClick={() => {
  setSeleccionado(articulo)
  setRespuesta("")
  setError("")
}}
```

## Paso 5. Probar

1. Elige una noticia.
2. Pulsa **Preguntar**.
3. Debe aparecer un párrafo sobre esa noticia.
4. Elige otra noticia: la respuesta anterior desaparece.

En F12 → **Red** quedan las dos peticiones: `articles` por `fetch` y `interactions` por Axios.

## Paso 6. Marcar la entrega y subirla

1. Al inicio de este archivo, en **Integrantes**, escribe el nombre completo de cada estudiante del equipo.
2. El archivo `.env` no se sube. Ahí está tu llave.
3. En la terminal del proyecto:

```bash
git add .
git commit -m "Consumo de Gemini con Axios"
git push -u origin HEAD
```

4. Abre tu repositorio en GitHub y comprueba que se vean los nombres al inicio de `LABORATORIO.md` y los cambios de `src/App.jsx`.
5. Copia la URL de **tu** repositorio y envíala por el medio que indique el docente.

Si el `push` pide usuario y contraseña, usa tu usuario de GitHub. La contraseña de la cuenta no sirve: GitHub pide un token personal, o puedes subir desde GitHub Desktop.

## Si algo falla

| Lo que ves | Qué revisar |
| --- | --- |
| `axios is not defined` | El import y que `npm install axios` haya terminado. |
| "Falta la llave en el archivo .env" | La variable se llama `VITE_GEMINI_API_KEY` y reiniciaste `npm run dev`. |
| `API key not valid` | La llave va completa, sin espacios ni comillas. |
| El modelo no existe | En AI Studio abre **Get code** y copia el nombre del modelo dentro del `axios.post`. |

## Preguntas de salida

1. En la lista, ¿qué línea convierte la respuesta de `fetch` en un objeto?
2. Con Axios, ¿en qué propiedad llega el JSON?
3. ¿Qué datos de la noticia viajan dentro de `prompt`?
