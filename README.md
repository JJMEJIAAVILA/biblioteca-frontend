# 📖 biblioteca-frontend (Aplicación de Gestión de Libros con React y Vite)

Este es el frontend de la aplicación de gestión de libros, construido con React y Vite. Proporciona una interfaz de usuario intuitiva para interactuar con la API RESTful del backend, permitiendo a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la información de los libros.

## 🚀 Tecnologías Utilizadas

* **React 18+**
* **Vite** (bundler y servidor de desarrollo)
* **JavaScript (ES6+)**
* **Axios** (cliente HTTP para peticiones a la API)
* **CSS Puro** (para estilos)

## ✨ Características

* Interfaz de usuario moderna y responsiva.
* Formulario para crear y editar libros.
* Tabla para listar todos los libros registrados.
* Funcionalidad de búsqueda en tiempo real (por título, autor o ISBN).
* Botones de acción (Editar, Eliminar) con confirmación.
* Gestión de estado simple con React Hooks.
* Comunicación con un backend RESTful (se espera que el backend esté ejecutándose en `http://localhost:8080`).

## 📦 Estructura del Proyecto

biblioteca-frontend/
├── public/                 # Archivos estáticos (ej. logo)
│   └── logo-libros.png
├── src/
│   ├── components/         # Componentes de UI (LibroForm, LibroList)
│   │   ├── LibroForm.jsx
│   │   └── LibroList.jsx
│   ├── services/           # Lógica para interactuar con la API (LibroService.js)
│   │   └── LibroService.js
│   ├── App.jsx             # Componente principal de la aplicación
│   ├── App.css             # Estilos globales y específicos de componentes
│   └── main.jsx            # Punto de entrada de la aplicación React
├── .gitignore              # Archivos y directorios a ignorar por Git
├── index.html              # Archivo HTML principal
├── package.json            # Dependencias y scripts del proyecto
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo


## 🛠️ Configuración y Ejecución Local

Sigue estos pasos para poner en marcha el frontend en tu máquina local.

### **Requisitos Previos**

* Node.js (versión 16 o superior) y npm (incluido con Node.js).
* Se requiere que el **backend de Spring Boot** esté ejecutándose (generalmente en `http://localhost:8080`).

### **Pasos para Ejecutar**

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/JJMEJIAAVILA/biblioteca-frontend.git](https://github.com/JJMEJIAAVILA/biblioteca-frontend.git)
    cd biblioteca-frontend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configuración del Puerto del Servidor de Desarrollo (Opcional):**
    Por defecto, Vite intentará iniciarse en el puerto `5173`, luego `5174`, etc., si el puerto principal está ocupado. Puedes fijar un puerto específico editando `vite.config.js`:
    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      server: {
        port: 5174, // O el puerto deseado, ej., 3000
      }
    })
    ```

4.  **Asegurar la Conexión al Backend:**
    Verifica que la URL de la API en `src/services/LibroService.js` apunte correctamente a la ubicación de tu backend (ej., `http://localhost:8080/api/libros`).
    ```javascript
    // src/services/LibroService.js
    const API_URL = 'http://localhost:8080/api/libros';
    ```

5.  **Ejecutar la Aplicación:**
    ```bash
    npm run dev
    ```
    Esto iniciará el servidor de desarrollo de Vite. Verás un mensaje en tu terminal indicando la URL local donde la aplicación está corriendo (ej., `http://localhost:5174/`).

6.  **Abrir en el Navegador:**
    Accede a la aplicación en tu navegador web usando la URL proporcionada por Vite (ej., `http://localhost:5174/`).

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1.  Haz un "fork" del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz commits significativos (`git commit -m "feat: añadir nueva funcionalidad X"`).
4.  Empuja tus cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.