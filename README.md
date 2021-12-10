
# Cómo inciar el proyecto

1. Situarse en la raíz del proyecto y ejecutar `yarn install`.
2. Ejecutar `yarn run dev:next` para iniciar el proyecto de **Next.js**
   - Ir a http://localhost:3000
3. Ejecutar `yarn run dev:expo` para iniciar el proyecto de **Expo**.
	- Ir a http://localhost:19002
	- Descargarse la aplicación [Expo Go](https://expo.dev/client) para conectar el móvil a Expo mediante el código QR.



# Estructura de `packages`

- **app**: contiene todos los componentes y funciones que se comparten.
- **expo**: contiene el proyecto de React Native
- **next**: contiene el proyecto de Next.js



# Nota

- API utilizada: https://fakestoreapi.com/docs
- El usuario y la contraseña vienen pre-rellenados en el login para no tener que buscar un usuario válido.



# Posibles mejoras

- Añadir declaraciones de TypesScript faltantes y separarlas en un archivo de tipos en su carpeta de feature correspondiente.
- Implementación de Redux o MobX para manejar los datos de forma más óptima.
- Aunque los estilos esta vez no han sido importantes, habría que buscar alguna forma de centralizarlos para poder reutilizarlos.
- Hacer páginas privadas, no accesibles a usuarios no autenticados.
- En la cesta, cuando se le da al botón de comprar y el usuario no está registrado o logeado, pedírselo.
- Mejorar el flujo de inicialización, algunas cosas no funcionan como deberían al darle a F5. Por ejemplo si refrescas la página en `/productDetail?id=1` se pierde el valor de `useRouting` y no puede obtener el id del producto.
- Añadir feedback al usuario al realizar acciones con éxito o fallidas.
- Añadir placeholders en las vistas cuando no tienen ítems, estilo "Tu cesta está vacía".
- Externalizar algunos componentes que aunque no sean reutilizables, ocupan demasiadas líneas.
- Obtener la geolocalización en el registro

