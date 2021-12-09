# Pendiente

💎 = luxury


- **Usuario**
  - Registro (POST `/users`)
  - Formulario de edición (PUT `/users`)
  - 💎 Meter baseUrl en axios
  - 💎 Guardar el token devuelto por el login en las cabeceras de axios
- **Lista de productos**
  - 💎 En lugar de hacer el filtro local de categorías, hacer GET `/products/category/jewelery`
  - Ordenación de productos en GET `/products?sort=desc`
- **Cesta**
  - Ver lista de la cesta (GET `/carts`)
    - Componente CartList
  - Añadir productos a la cesta (POST `/carts/user/:id`)
  - Eliminar productos de la cesta (DELETE `/cart`)
  - Editar productos de la cesta (PUT `/cart`)
  - 💎 Botón fake para "Comprar" (sin acción)
- 💎 Añadir declaraciones de TypesScript faltantes.
- 💎 Optimizaciones.
- Readme



---



# Carpetas de `packages`

- **app**: contiene todos los componentes y funciones que se comparten
- **expo**: contiene el proyecto de React Native
- **next**: contiene el proyecto de Next.js


