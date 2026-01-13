# Guía de Deployment - Linkeer

## Requisitos Previos

1. **Base de datos PostgreSQL**
   - PostgreSQL 14 o superior
   - Crear base de datos: `CREATE DATABASE linkeer;`

2. **Variables de Entorno**
   - Copiar `.env.example` a `.env.production`
   - Configurar todas las variables requeridas

## Deployment en Vercel

1. **Conectar repositorio** en Vercel dashboard

2. **Configurar variables de entorno:**
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
   NODE_ENV=production
   ```

3. **Build Command:**
   ```
   pnpm build
   ```

4. **Output Directory:**
   ```
   .next
   ```

5. **Deploy**

## Post-Deployment

1. Verificar health check: `https://tu-dominio.com/api/health`
2. Verificar sitemap: `https://tu-dominio.com/sitemap.xml`
3. Verificar robots.txt: `https://tu-dominio.com/robots.txt`
4. Probar cada herramienta:
   - WhatsApp Link Generator
   - QR Code Generator
   - URL Shortener

## Troubleshooting

### Error de migraciones
```bash
npx prisma migrate deploy
```

### Error de cliente Prisma
```bash
npx prisma generate
```

### Variables de entorno no se aplican
Verificar que las variables empiecen con `NEXT_PUBLIC_` para ser accesibles en el cliente.
