# Estructura del proyecto

1. Stack de herramientas
    React + Vite
1.2 UI / Styling
    Tailwind CSS
1.3 Opcional pero muy recomendable:
    ESLint o prettier

2.Infraestructura AWS (barata y elegante)
    Usuario - CloudFront (CDN) - S3 (Static Website) - React build (HTML, CSS, JS)

src/
├── assets/        → imágenes, íconos
├── components/    → UI reutilizable
├── pages/         → Home, Projects, Challenges, etc.
├── data/          → JSON estático (proyectos, skills)
├── charts/        → componentes de gráficas
├── layout/        → Navbar, Footer
├── hooks/         → hooks simples
└── main.tsx


3. posible despliegue

GitHub
  ↓
Build local (Vite)
  ↓
Upload build/ → S3
  ↓
CloudFront invalidation

GitHub Actions para deploy automático


4. Extras (esos no se implementan hasta en un principio)

Terraform para desplegar en codigo
kubernetes 

