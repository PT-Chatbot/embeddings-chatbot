# Unicaribe Bot

## Descripción

Unicaribe Bot es una herramienta diseñada para permitirte hacer preguntas sobre la Universidad del Caribe. Utilizando tecnologías avanzadas como Chromadb y la API de OpenAI, Este Chatbot ofrece respuestas precisas sobre la vida universitaria.

## Funcionalidades

- **Conversión a Embeddings con Chromadb:** Los documentos se convierten en embeddings utilizando Chromadb.
- **Consulta a la Base de Datos Vectorial:** Tu pregunta se convierte en embedding y se comparan con los documentos en la base de datos para encontrar las mejores coincidencias.
- **Integración con OpenAI API:** La aplicación usa la API de OpenAI para generar respuestas a partir de los documentos recuperados.
- **Respuesta Eficiente:** Obtén respuestas precisas y relevantes basadas en la Universidad del Caribe.

## Capturas de Pantalla

### Interfaz Principal

![Interfaz Principal]()

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

Puedes verificar las instalaciones con los siguientes comandos:

```bash
node --version
npm --version
git --version
```

Asegúrate de establecer las siguientes variables de entorno en un archivo `.env` dentro de la carpeta `frontend`:

```env
SECRET_OPENAI_API_KEY="sk-XXXX"
PUBLIC_PROCESS_FILES_SERVER="http://127.0.0.1:5000"
```

## Comenzando

### Instalación

Para desplegar el proyecto en tu entorno local para desarrollo y pruebas, sigue estos pasos:

1. Clona el repositorio:

```bash
git clone https://github.com/PT-Chatbot/embeddings-chatbot.git
```

2. Navega al directorio del proyecto:

```bash
cd docsbot/frontend
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev

flask --app app run --debug
```

5. Abre `http://localhost:5173` en tu navegador para ver la aplicación.

## Herramientas Utilizadas

- [Sveltekit](https://kit.svelte.dev/)
- [Chromadb](https://www.trychroma.com/)
- [OpenAI API](https://platform.openai.com/docs/introduction)

## Contribuir

Las contribuciones son bienvenidas y ayudan a mejorar y expandir este proyecto. Si deseas contribuir, puedes seguir estos pasos:

1. **Fork** el repositorio.
2. Crea tu **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3. Haz tus **cambios** en el código.
4. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`).
5. **Push** a la rama (`git push origin feature/AmazingFeature`).
6. Abre un **Pull Request**.

## Contacto

- **Nombre**: Marcos D. Pool
- **Correo Electrónico**: <damian.marcospool@gmail.com>
- **GitHub**: [marcosd59](https://github.com/marcosd59)

---

© 2024 Marcos Damián Pool Canul.

```bash
git clone https://github.com/PT-Chatbot/embeddings-chatbot.git
```
