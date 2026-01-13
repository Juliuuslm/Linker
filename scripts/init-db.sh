#!/bin/bash
# Script para inicializar base de datos PostgreSQL en producción

echo "🔧 Inicializando base de datos..."

# Verificar que DATABASE_URL está definida
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL no está definida"
  exit 1
fi

# Generar cliente Prisma
echo "📦 Generando cliente Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🚀 Ejecutando migraciones..."
npx prisma migrate deploy

echo "✅ Base de datos inicializada correctamente"
