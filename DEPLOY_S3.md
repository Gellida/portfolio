# Deployment a AWS S3

## Pasos para desplegar tu portafolio en S3

### 1. Build del proyecto
```bash
npm run build
```
Esto generará los archivos en la carpeta `dist/`

### 2. Crear bucket S3
```bash
aws s3 mb s3://tu-nombre-bucket
```

### 3. Configurar el bucket como sitio web estático

Usa el archivo `s3-website-config.json` incluido:

```bash
aws s3 website s3://tu-nombre-bucket --index-document index.html --error-document index.html
```

O aplica la configuración completa:
```bash
aws s3api put-bucket-website --bucket tu-nombre-bucket --website-configuration file://s3-website-config.json
```

### 4. Configurar la política del bucket para acceso público

Primero, desbloquea el acceso público:
```bash
aws s3api put-public-access-block \
    --bucket tu-nombre-bucket \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

Luego aplica la política:
```bash
aws s3api put-bucket-policy --bucket tu-nombre-bucket --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tu-nombre-bucket/*"
    }
  ]
}'
```

### 5. Subir los archivos
```bash
aws s3 sync dist/ s3://tu-nombre-bucket --delete
```

### 6. URL del sitio
Tu sitio estará disponible en:
```
http://tu-nombre-bucket.s3-website-[region].amazonaws.com
```

## Configuración con CloudFront (Opcional pero recomendado)

Para HTTPS y mejor rendimiento:

### 1. Crear distribución CloudFront
```bash
aws cloudfront create-distribution --origin-domain-name tu-nombre-bucket.s3-website-[region].amazonaws.com
```

### 2. Configurar Custom Error Responses
En la consola de CloudFront, añade:
- Error Code: 403 y 404
- Response Page Path: /index.html
- Response Code: 200

### 3. Actualizar archivos
Cuando actualices el sitio, invalida el caché:
```bash
aws cloudfront create-invalidation --distribution-id TU_DISTRIBUTION_ID --paths "/*"
```

## Script de deployment rápido

Añade este script a `package.json`:
```json
"scripts": {
  "deploy": "npm run build && aws s3 sync dist/ s3://tu-nombre-bucket --delete"
}
```

Luego simplemente ejecuta:
```bash
npm run deploy
```

## Notas importantes

1. **Enrutamiento SPA**: La configuración `ErrorDocument: index.html` permite que React Router maneje todas las rutas
2. **Caché**: Considera configurar headers de caché apropiados para los assets
3. **HTTPS**: Usa CloudFront para servir tu sitio con HTTPS
4. **Dominio personalizado**: Puedes configurar Route 53 para usar tu propio dominio

## Troubleshooting

Si las rutas no funcionan:
- Verifica que `ErrorDocument` esté configurado como `index.html`
- Limpia el caché del navegador
- Si usas CloudFront, invalida el caché
