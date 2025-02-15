# 🚀 YourNextProject

<div align="center">
  <img src="public/logo.png" alt="YourNextProject Logo" width="200"/>
  
  ![Next.js](https://img.shields.io/badge/Next.js-13.0-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
  ![Prisma](https://img.shields.io/badge/Prisma-4.0-2D3748?style=for-the-badge&logo=prisma)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
</div>

## 📋 Descripción

YourNextProject es una plataforma innovadora diseñada para compartir y descubrir ideas de proyectos de programación. Los desarrolladores pueden publicar sus ideas, recibir votos de la comunidad y encontrar inspiración para sus próximos proyectos.

## ✨ Características

- 🎯 **Categorización de Ideas**: Frontend, Backend, Fullstack
- 👥 **Sistema de Votación**: Upvote/Downvote para ideas
- 🔄 **Carga Infinita**: Navegación fluida de ideas
- 📱 **Diseño Responsivo**: Experiencia óptima en todos los dispositivos
- ⚡ **Rendimiento Optimizado**: Carga rápida y eficiente
- 🎨 **UI Moderna**: Interfaz intuitiva y atractiva

## 🛠️ Tecnologías

- **Frontend**
  - Next.js 13
  - TypeScript
  - Tailwind CSS
  - React Intersection Observer

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/yourusername/yournextproject.git
   cd yournextproject
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con tus configuraciones

4. **Inicializar la base de datos**
   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── api/           # API Routes
│   ├── components/    # Componentes React
│   └── page.tsx       # Página principal
├── prisma/
│   └── schema.prisma  # Esquema de la base de datos
└── public/            # Archivos estáticos
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Equipo

- [Tu Nombre](https://github.com/yourusername) - Desarrollador Principal

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

<div align="center">
  <p>¿Te gusta el proyecto? ¡Dale una ⭐!</p>
  <p>Desarrollado con ❤️ por el equipo de YourNextProject</p>
</div>
