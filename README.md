
#  🎬 The Moovie lazer 

TheMoovieLazer es una plataforma web desarrollada como una solución integral para la exploración y consulta de datos cinematográficos. Funcionando como un buscador especializado, la aplicación permite a los usuarios verificar información detallada sobre películas y series, ofreciendo una experiencia similar a plataformas de referencia como IMDb.

El núcleo técnico del proyecto reside en su integración con la API de The Movie Database (TMDB), la cual alimenta la plataforma con una base de datos global y actualizada. Diseñada con un enfoque en la eficiencia y la usabilidad, la aplicación facilita la navegación a través de una interfaz responsiva, permitiendo que tanto la búsqueda de títulos como la visualización de fichas técnicas se realicen de manera fluida en diversos dispositivos.

🧑‍💻 Aspectos Técnicos Destacados

Arquitectura Frontend: El proyecto está construido sobre React junto con Vite, lo que garantiza una velocidad de carga ultrarrápida y un entorno de desarrollo altamente optimizado.

🧩 Diseño y Experiencia de Usuario: 

La interfaz está desarrollada con Chakra UI, permitiendo crear componentes accesibles, modulares y con un diseño estéticamente limpio que se adapta perfectamente a cualquier tamaño de pantalla.

🧠 Lógica de Interacción: 

Implementado con JavaScript moderno, el proyecto gestiona de manera eficiente las peticiones asíncronas hacia la API, garantizando que la experiencia de navegación del usuario sea fluida, intuitiva y sin interrupciones.

📱 Diseño Responsivo: 

Interfaz construida con Chakra UI que garantiza una experiencia de usuario fluida y adaptable, permitiendo una navegación perfecta tanto en dispositivos móviles como en equipos de escritorio.

📖 Cómo Utilizar el Proyecto

🔎 Búsqueda: 

Ingresa el nombre de una película en el buscador principal para obtener resultados instantáneos.  

🖱️ Detalles: 

Haz clic en el póster o título de cualquier película para acceder a su ficha técnica completa y descripción detallada.  

⚙️ Persistencia: 

La aplicación utiliza el almacenamiento local del navegador para gestionar preferencias de navegación durante tu sesión.  

💻 Instalación y Ejecución Local

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

Clona el repositorio: git clone https://github.com/Tavo172003/TheMoovieLazer.git.  

Accede al directorio: cd TheMoovieLazer.  

Instala las dependencias necesarias: npm install. 

Configuración: Crea un archivo .env en la raíz del proyecto y añade tu API Key, ejemplo: 

VITE_TMDB_API_KEY=

VITE_TMDB_BASE_URL=

Inicia el servidor de desarrollo: npm run dev.  

⚠️Solución de Problemas 

Error de API: Si la aplicación no muestra resultados, verifica que tu clave API de TMDB sea válida y esté correctamente configurada en el archivo .env.  

Problemas de compilación: Si surgen errores al iniciar, elimina la carpeta node_modules y el archivo package-lock.json, luego vuelve a ejecutar npm install. 
