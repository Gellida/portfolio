# Google Sheets API Server

Servidor ligero Node.js que expone un endpoint para leer datos de Google Sheets y devolverlos como JSON limpio.

## Arquitectura

El proyecto ahora queda dividido en capas simples para que puedas crecer sin convertir `server.js` en un cuello de botella:

```text
.
├── server.js                  # bootstrap del proceso HTTP
├── src/
│   ├── app.js                 # instancia Express y middleware global
│   ├── config/
│   │   └── env.js             # lectura centralizada de variables de entorno
│   ├── middleware/
│   │   ├── error-handler.js   # 404 y manejo de errores
│   │   ├── request-context.js # request id y access log
│   │   └── security.js        # helmet y rate limit
│   ├── routes/
│   │   ├── health.routes.js   # endpoint de health
│   │   └── sheets.routes.js   # endpoint público de sheets
│   ├── services/
│   │   └── google-sheets.service.js  # integración con Google Sheets API
│   └── utils/
│       └── rows.js            # transformación de filas a JSON
└── test.sh                    # smoke test del servidor
```

Regla práctica: `routes` recibe HTTP, `services` habla con externos, `utils` transforma datos y `config` concentra la configuración.

## Instalación

```bash
npm install
cp .env.example .env
```

## Configuración

Edita `.env` con tus valores:

```env
GOOGLE_SHEETS_API_KEY=AIzaSy...
SHEET_ID=1BxiMVs0XRA5nFMwBeyMjWx5L1i0XJfQ3bZCTf8o
SHEET_GID=0
SHEET_TITLE=Encuesta
SHEET_RANGE=A1:Z1000
PORT=3000
```

### Obtener las credenciales

1. **SHEET_ID**: En URL de Google Sheets: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
  - También acepta la URL completa; el server extrae el ID automáticamente.

2. **SHEET_GID**: El identificador de la pestaña en la URL `...#gid=0`.
  - Si lo defines, el server resuelve el nombre real de la pestaña por metadata.

3. **GOOGLE_SHEETS_API_KEY**: 
   - Ve a [Google Cloud Console](https://console.cloud.google.com)
   - Crea un proyecto nuevo
   - Habilita "Google Sheets API"
   - Crea una API key (Credenciales → Crear credencial → Clave de API)
   - **Importante**: Haz tu Sheet públicamente visible (compartir → Cualquiera con el enlace)

4. **SHEET_RANGE**: Solo el rango A1, sin el nombre de la hoja.
  - Ejemplo: `A1:Z1000`
  - Si no lo defines, usa `A1:Z1000` por defecto.

El servidor valida al arrancar que `GOOGLE_SHEETS_API_KEY` y `SHEET_ID` existan. Si faltan, falla inmediatamente con un error claro.

## Uso

```bash
npm start
# o con watch mode
npm run dev
```

## Endpoints

### GET `/api/sheets`
Devuelve los datos del Sheet en JSON limpio.

**Ejemplo respuesta:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "nombre": "Juan",
      "email": "juan@example.com",
      "edad": "30"
    },
    {
      "nombre": "María",
      "email": "maria@example.com",
      "edad": "28"
    }
  ]
}
```

### GET `/health`
Verifica que el servidor está activo.

### POST `/api/diagnostico/evaluar`
Recibe respuestas de un paciente en JSON y devuelve análisis clínico completo.

**Body ejemplo:**
```json
{
  "nombre": "Ana",
  "apellidos": "Pérez",
  "edad": 34,
  "sexo": "F",
  "fecha": "2026-05-20",
  "respuestas": [
    "A VECES (2)",
    "CASI SIEMPRE (3)",
    "NUNCA (0)",
    "A VECES (2)",
    "SIEMPRE (4)",
    "A VECES (2)"
  ]
}
```

También acepta respuestas numéricas directas (`0` a `4`) en lugar de texto.

### POST `/api/diagnostico/tratamiento`
Recibe respuestas y devuelve diagnóstico + riesgo + recomendaciones estructuradas para consumo en frontend o integraciones.

**Response ejemplo:**
```json
{
  "success": true,
  "paciente": {
    "nombre": "Ana Pérez",
    "edad": 34,
    "sexo": "F",
    "fecha": "2026-05-20"
  },
  "resultado": {
    "diagnostico": "Síntomas compatibles con ojo seco moderado.",
    "riesgo": "medio",
    "recomendaciones": [
      "Aumentar lubricación ocular con lágrimas artificiales",
      "Reducir exposición prolongada a pantallas",
      "Evaluación oftalmológica en las próximas semanas"
    ],
    "puntuacion": {
      "total": 13,
      "maximo": 24,
      "porPregunta": [2, 3, 0, 2, 4, 2]
    },
    "clasificacion": {
      "nivel": "Moderado",
      "descripcion": "Síntomas moderados de ojo seco."
    }
  }
}
```

## Seguridad y operación

- `helmet` añade cabeceras HTTP seguras por defecto.
- `/api/*` tiene rate limiting para frenar abuso básico.
- Cada respuesta incluye `X-Request-Id` para poder trazar errores y requests.
- Los errores JSON incluyen `requestId` para correlacionarlos con logs.
- Logs estructurados en JSON con `pino` (nivel configurable vía `LOG_LEVEL`).
- Cierre ordenado ante `SIGTERM`/`SIGINT`: deja de aceptar requests y cierra Postgres y SQLite.

### Comportamiento según el entorno (`NODE_ENV`)

Estos puntos **afectan cómo se consume la API**, sobre todo en producción (`NODE_ENV=production`):

| Tema | Desarrollo (default) | Producción (`NODE_ENV=production`) |
|---|---|---|
| Autenticación | Opcional: si no defines `API_SECRET`, la API es pública | **Obligatoria**: el server no arranca sin `API_SECRET` y las rutas protegidas exigen `Authorization: Bearer <token>` |
| CORS | Sin `ALLOWED_ORIGINS` se permite cualquier origen | Sin `ALLOWED_ORIGINS` se **bloquea** todo origen cross-origin desde navegador |
| Detalle de errores | La respuesta incluye `debug` + `stack` (campo `error` con el mensaje técnico) | Solo el mensaje público; sin `debug` ni `stack` |

Variables relacionadas en `.env`:

```env
NODE_ENV=production
API_SECRET=un-token-secreto-largo
ALLOWED_ORIGINS=https://tudominio.com,https://app.tudominio.com
LOG_LEVEL=info
# Override opcional del detalle de errores (por defecto depende de NODE_ENV)
EXPOSE_ERROR_DETAILS=false
```

### Autenticación

Las rutas protegidas (sheets, diagnóstico, publicaciones, admin, pacientes) requieren el header cuando `API_SECRET` está definido:

```http
Authorization: Bearer <API_SECRET>
```

Sin header válido devuelven `401`:

```json
{
  "success": false,
  "error": "No autorizado.",
  "code": "UNAUTHORIZED",
  "requestId": "..."
}
```

### Límite de tamaño del body

El body JSON está limitado a **1 MB**. Un payload mayor responde `413`:

```json
{
  "success": false,
  "error": "El cuerpo de la solicitud es demasiado grande.",
  "code": "PAYLOAD_TOO_LARGE",
  "requestId": "..."
}
```

## Características

- ✓ Lee datos directamente de Google Sheets API
- ✓ Transforma arrays en objetos JSON
- ✓ Limpia headers (minúsculas, espacios → guiones bajos)
- ✓ Valida configuración crítica al arrancar
- ✓ Añade trazabilidad por request con `X-Request-Id`
- ✓ Aplica hardening HTTP y rate limiting básico
- ✓ Manejo consistente de errores
- ✓ Sin base de datos, sin complejidad

## Extender

Si mañana crece el proyecto, ésta es la extensión natural:

1. Nuevos proveedores externos: crea otro archivo en `src/services/`.
2. Nuevos endpoints: agrega otro router en `src/routes/`.
3. Validaciones de entrada: añade middleware dedicado antes del handler.
4. Caché o persistencia: añade una capa `src/repositories/` sin tocar las rutas.

Para agregar autenticación con servicio (sin hacer el Sheet público):

1. Descarga credenciales JSON desde Google Cloud
2. Instala `google-auth-library`: `npm install google-auth-library`
3. Cambia `src/services/google-sheets.service.js` para usar JWT en lugar de API key
# Server

## Guardar formularios en PostgreSQL

Se agrego un endpoint publico para recibir datos de formularios y guardarlos en PostgreSQL.

### 1) Variables de entorno

Agrega en tu `.env`:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=tu_usuario
PGPASSWORD=tu_password
PGDATABASE=tu_base
PGSSL=false
```

### 2) Crear tabla

Ejecuta el SQL de `docs/postgres-formulario.sql` en tu base de datos.

### 3) Endpoint

`POST /api/formulario`

Guarda cualquier JSON del formulario. Si envias `nombre`, `email`, `telefono` o `mensaje`, tambien se guardan en columnas dedicadas.

Body ejemplo:

```json
{
  "nombre": "Juan Perez",
  "email": "juan@correo.com",
  "telefono": "+52 55 1234 5678",
  "mensaje": "Quiero una demo",
  "empresa": "Acme",
  "cargo": "Analista"
}
```

Response 201 ejemplo:

```json
{
  "success": true,
  "message": "Formulario guardado correctamente.",
  "data": {
    "id": 1,
    "created_at": "2026-05-21T10:30:00.000Z"
  }
}
```

## Consultar pacientes guardados

Rutas para leer los registros de `diagnostico_resultados`. Requieren autenticación (`Authorization: Bearer <token>`).

### Persistencia de diagnósticos

Los siguientes endpoints guardan automáticamente el resultado en `diagnostico_resultados`:

| Endpoint | ¿Persiste? | Campos clave guardados |
|---|---|---|
| `POST /api/diagnostico/evaluar` | ✅ | `respuestas`, `puntuacion_total`, `clasificacion`, `analisis_ia` |
| `POST /api/diagnostico/tratamiento` | ✅ | `respuestas`, `puntuacion_total`, `clasificacion`, `diagnostico`, `riesgo`, `recomendaciones` |
| `POST /api/diagnostico/impacto-factores` | ✅ | `respuestas`, `puntuacion_total`, `clasificacion`, `analisis_ia`, `factores_opcionales` |
| `POST /api/diagnostico/exportar` | ❌ | Solo escribe a la hoja "Diagnósticos" de Google Sheets |

La columna `respuestas` es **auto-descriptiva**: guarda cada pregunta junto con la respuesta del paciente y su puntaje, no solo el valor suelto. Formato:

```json
[
  {
    "numero": 1,
    "pregunta": "¿Con qué frecuencia ha experimentado sensación de ardor, picazón o molestia en sus ojos?",
    "respuesta": "A VECES (2)",
    "puntaje": 2
  }
]
```

> Nota: los registros creados antes de este cambio quedan en el formato anterior (arreglo de valores sueltos, ej. `["A VECES (2)", ...]`). Solo los nuevos llevan el detalle pregunta+respuesta+puntaje.

### GET `/api/pacientes`

Lista pacientes con paginación y filtros opcionales.

| Query param | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Filtra por nombre (ILIKE, parcial) |
| `clasificacion` | string | `Normal`, `Leve`, `Moderado` o `Severo` |
| `endpoint` | string | `/evaluar`, `/tratamiento` o `/impacto-factores` |
| `limit` | number | Registros por página (default 50, máx 200) |
| `offset` | number | Desplazamiento para paginación (default 0) |

**Response ejemplo:**
```json
{
  "success": true,
  "count": 2,
  "pacientes": [
    {
      "id": 42,
      "nombre": "Ana",
      "apellidos": "Pérez",
      "edad": "34",
      "sexo": "F",
      "fecha": "2026-05-20",
      "puntuacion_total": 13,
      "clasificacion": "Moderado",
      "diagnostico": null,
      "riesgo": null,
      "recomendaciones": null,
      "analisis_ia": "Paciente presenta síntomas compatibles con...",
      "factores_opcionales": null,
      "endpoint": "/evaluar",
      "created_at": "2026-05-20T18:45:00.000Z"
    }
  ]
}
```

### GET `/api/pacientes/:id`

Devuelve un paciente específico por ID, incluyendo el campo `respuestas` (JSONB).

**Response 404** si el ID no existe:
```json
{
  "success": false,
  "message": "Paciente no encontrado."
}
```
