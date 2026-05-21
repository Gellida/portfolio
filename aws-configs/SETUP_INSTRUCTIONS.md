# Configuración de Seguridad AWS S3 + CloudFront

## 1️⃣ Configurar Response Headers Policy (Seguridad HTTP)

### Opción A: AWS Console
1. Ve a **CloudFront > Response Headers Policies**
2. Crea una nueva política: **Create response headers policy**
3. Nombra la política: `PortfolioSecurityHeaders`
4. Copia la configuración de [cloudfront-response-headers-policy.json](./cloudfront-response-headers-policy.json)
5. Aplica la política a tu distribución CloudFront:
   - Ve a **CloudFront > Distributions > Tu distribución > Edit**
   - En **Default cache behavior**, asigna la política en **Response Headers Policy**

### Opción B: AWS CLI
```bash
aws cloudfront create-response-headers-policy \
  --response-headers-policy-config file://cloudfront-response-headers-policy.json
```

---

## 2️⃣ Configurar CloudFront OAC (Origin Access Control)

### Paso 1: Crear la OAC
1. Ve a **CloudFront > Origin Access > Origin Access Control**
2. **Create new OAC**
   - Name: `portfolio-s3-oac`
   - Origin type: `S3`
3. Copia el **OAC ID** que se genera (lo necesitarás después)

### Paso 2: Actualizar la Política del Bucket S3

⚠️ **IMPORTANTE**: Reemplaza `ACCOUNT_ID` y `DISTRIBUTION_ID` en [bucket-policy-with-oac.json](./bucket-policy-with-oac.json)

Para encontrar estos valores:
- **ACCOUNT_ID**: Ve a AWS Console > Settings > Account ID
- **DISTRIBUTION_ID**: CloudFront > Distributions > Tu distribución > Distribution ID

Luego aplica la política:
1. Ve a **S3 > portoflio-demo bucket > Permissions > Bucket policy**
2. Copia el contenido de `bucket-policy-with-oac.json` (con los IDs actualizados)
3. **Save changes**

### Paso 3: Configurar CloudFront Origin

1. Ve a **CloudFront > Distributions > Tu distribución > Origins**
2. Edita el origen S3:
   - **Origin Domain**: `portoflio-demo.s3.amazonaws.com`
   - **Origin type**: `S3`
   - **Origin Access**: `Legacy access identities` ❌ → **Origin access control settings** ✅
   - Selecciona la OAC que creaste
3. **Save**

### Paso 4: Bloquear Acceso Público al Bucket

⚠️ **CRÍTICO**: Asegúrate de que tu bucket S3 NO sea accesible públicamente:
1. Ve a **S3 > portoflio-demo > Permissions > Block public access**
2. Habilita todas las opciones:
   - ✅ Block all public access
   - ✅ Block public access to buckets and objects granted through new access control lists (ACLs)
   - ✅ Block public access to buckets and objects granted through any access control lists (ACLs)
   - ✅ Block public access to buckets and objects granted through new public bucket or access point policies
   - ✅ Block public and cross-account access to buckets and objects through any public bucket or access point policies

---

## 3️⃣ Verificar y Probar

```bash
# Verificar headers de seguridad
curl -I https://josegellida.com

# Debería mostrar:
# strict-transport-security: max-age=63072000; includeSubDomains; preload
# x-content-type-options: nosniff
# x-frame-options: DENY
# content-security-policy: ...
# permissions-policy: ...
```

---

## 4️⃣ Actualizar Variable de Entorno

En tu archivo `.env` o variables de CI/CD:

```env
VITE_OCULARIA_API_BASE_URL=https://tu-api-domain.com
```

**Nota**: La URL ya no tiene fallback. Si no está configurada, la app fallará en build time o runtime.

---

## 5️⃣ Checklist Post-Configuración

- [ ] OAC creada y asignada a CloudFront
- [ ] Bucket policy actualizada con OAC ARN
- [ ] Response Headers Policy aplicada a CloudFront
- [ ] Block public access habilitado en S3
- [ ] Variable de entorno `VITE_OCULARIA_API_BASE_URL` configurada
- [ ] Verificar headers de seguridad con `curl -I`
- [ ] Comprobar que el bucket NO es accesible directamente
  - Esto debería fallar: `https://portoflio-demo.s3.amazonaws.com/index.html`
  - Esto debería funcionar: `https://josegellida.com/`

---

## ⚠️ Nota: Problemas Comunes

### "CloudFront devuelve 403 Access Denied"
- Verifica que la bucket policy está correctamente actualizada con el OAC ARN
- Comprueba que el bucket NO tiene Block Public Access deshabilitado de forma incorrecta
- Asegúrate de que el OAC en CloudFront coincide con el que acabas de crear

### "Página en blanco después de aplicar CSP"
- Revisa la consola del navegador (F12 > Console)
- Si hay errores de CSP, actualiza la política en `cloudfront-response-headers-policy.json`
- Particularmente si tienes third-party scripts (analytics, etc.)

### "Google Analytics no funciona"
- La CSP ya incluye `https://www.googletagmanager.com` y `https://www.google-analytics.com`
- Si usas otra herramienta, añádela manualmente a la CSP

---

## Referencia: Headers de Seguridad

| Header | Propósito |
|--------|-----------|
| `Strict-Transport-Security` | Fuerza HTTPS (2 años) + preload en navegadores |
| `X-Content-Type-Options` | Previene MIME type sniffing (ej: ejecutar JS como HTML) |
| `X-Frame-Options` | Previene clickjacking (denegar frame en otros sitios) |
| `Content-Security-Policy` | Control granular de orígenes permitidos para scripts, estilos, etc. |
| `Permissions-Policy` | Restringe acceso a APIs de navegador (cámara, micrófono, etc.) |
| `Referrer-Policy` | Controla qué información de referrer se envía |
