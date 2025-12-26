# Configuración de GitHub Actions para Deploy Automático a S3

## Archivo de workflow creado

Ya se ha creado `.github/workflows/deploy.yml` que desplegará automáticamente tu sitio a S3 cada vez que hagas push a la rama `main`.

## Pasos para configurar los secrets en GitHub

### 1. Ve a tu repositorio en GitHub

### 2. Configurar secrets
1. Click en **Settings** (configuración del repositorio)
2. En el menú lateral, click en **Secrets and variables** → **Actions**
3. Click en **New repository secret**

### 3. Añade estos secrets:

**AWS_ACCESS_KEY_ID**
- Name: `AWS_ACCESS_KEY_ID`
- Value: Tu AWS Access Key ID

**AWS_SECRET_ACCESS_KEY**
- Name: `AWS_SECRET_ACCESS_KEY`
- Value: Tu AWS Secret Access Key

**CLOUDFRONT_DISTRIBUTION_ID** (Opcional, solo si usas CloudFront)
- Name: `CLOUDFRONT_DISTRIBUTION_ID`
- Value: Tu CloudFront Distribution ID

## Cómo funciona

Cada vez que hagas:
```bash
git add .
git commit -m "tu mensaje"
git push
```

GitHub Actions automáticamente:
1. ✅ Descarga tu código
2. ✅ Instala las dependencias
3. ✅ Ejecuta `npm run build`
4. ✅ Sube los archivos a S3
5. ✅ (Opcional) Invalida el caché de CloudFront

## Verificar el deployment

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Verás el workflow ejecutándose o completado
4. Click en el workflow para ver los logs detallados

## Ajustes necesarios

Si tu rama principal se llama `master` en lugar de `main`, edita `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches:
      - master  # Cambia aquí
```

Si tu región de AWS no es `us-east-1`, cámbiala en el archivo:
```yaml
aws-region: tu-region  # Ejemplo: us-west-2
```

## Ventajas

- ✅ Deploy automático al hacer push
- ✅ No necesitas AWS CLI en tu máquina local para deployar
- ✅ Histórico de deployments en GitHub
- ✅ Posibilidad de revertir cambios fácilmente
- ✅ CI/CD completo

## Troubleshooting

**Error de permisos:**
- Verifica que los secrets estén configurados correctamente
- Asegúrate de que las credenciales AWS tengan permisos para S3

**El workflow no se ejecuta:**
- Verifica que el archivo esté en `.github/workflows/deploy.yml`
- Asegúrate de hacer push a la rama configurada (main/master)

**Build falla:**
- Revisa los logs en la pestaña Actions de GitHub
- Verifica que `npm run build` funcione localmente
