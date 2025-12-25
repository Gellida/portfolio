# 🚀 josegc.dev - Portafolio Personal

Portafolio profesional de José García, Programador Multiplataforma. Sitio web desarrollado con React, TypeScript, TailwindCSS y Vite.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)

## 📋 Características

- ⚡ **Rendimiento**: Sitio estático optimizado con Vite
- 🎨 **Diseño moderno**: UI responsiva con TailwindCSS
- 📱 **Mobile-first**: Adaptado a todos los dispositivos
- 🧭 **Navegación fluida**: React Router para SPA
- 🔒 **Type-safe**: 100% TypeScript
- ♿ **Accesible**: Siguiendo estándares WCAG
- 🚀 **Deploy ready**: Optimizado para Cloudflare Pages

## 🛠️ Tecnologías

### Frontend
- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utility-first
- **React Router** - Enrutamiento SPA

### Herramientas
- **Vite** - Build tool y dev server
- **ESLint** - Linter
- **Git** - Control de versiones

## 📂 Estructura del Proyecto

```
src/
├── app/                  # Configuración de la app
│   ├── App.tsx          # Componente raíz
│   └── routes.tsx       # Definición de rutas
├── pages/               # Páginas principales
│   ├── Home/           
│   ├── Projects/       
│   ├── Challenges/     
│   ├── VisualThinking/ 
│   ├── About/          
│   └── Contact/        
├── components/          # Componentes reutilizables
│   ├── Section.tsx     
│   ├── ProjectCard.tsx 
│   └── TechCard.tsx    
├── layout/              # Layout components
│   ├── Layout.tsx      
│   ├── Navbar.tsx      
│   └── Footer.tsx      
├── data/                # Datos estáticos
│   ├── technologies.ts 
│   ├── projects.ts     
│   └── challenges.ts   
└── main.tsx             # Punto de entrada
```

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 📦 Build para Producción

```bash
# Generar build optimizado
npm run build

# Los archivos estarán en la carpeta dist/
# Listos para desplegar en cualquier hosting estático
```

## 🌐 Deployment

Este proyecto está optimizado para desplegarse en:

### Cloudflare Pages (Recomendado)

1. Conecta tu repositorio en Cloudflare Pages
2. Configuración:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Framework preset**: Vite

### Otras opciones

- **Vercel**: Auto-detecta Vite
- **Netlify**: Build command `npm run build`, publish `dist`
- **GitHub Pages**: Usa GitHub Actions
- **AWS S3 + CloudFront**: Sube el contenido de `dist/`

## 🎨 Personalización

### Modificar Contenido

1. **Tecnologías**: Edita `src/data/technologies.ts`
2. **Proyectos**: Edita `src/data/projects.ts`
3. **Challenges**: Edita `src/data/challenges.ts`

### Cambiar Colores

Modifica `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#tu-color',
    }
  }
}
```

## 📊 Performance

Optimizaciones implementadas:

- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Minificación CSS/JS
- ✅ Assets optimizados
- ✅ Lazy loading de rutas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 👤 Autor

**José García**
- Website: [josegc.dev](https://josegc.dev)
- GitHub: [@josegc](https://github.com/josegc)
- LinkedIn: [José García](https://linkedin.com/in/josegc)

## 🙏 Agradecimientos

- React Team
- Vite Team
- TailwindCSS Team
- Comunidad Open Source

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!
