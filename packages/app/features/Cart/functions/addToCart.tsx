
import axios from "axios";
import { ProductType } from "app/features/Products/partials/Product";



/**
 * Añade un producto al carrito
*/
export default async function addToCart(userId: number, productId: number) {
	
	try {
		
		// Obtengo mis ítems
		const resCart = await axios.get("/carts/user/1");
		const cartProductList: Array<{productId: number, quantity: number}> = resCart.data[0].products;
		
		
		// Busco si el productId está en mis ítems
		const idxEncontrado = cartProductList.findIndex(item => item.productId === productId);
		
		if (idxEncontrado !== -1) { // si no está, lo añado
			cartProductList.push({productId, quantity: 1});
		} else { // de lo contrario, sumo 1
			cartProductList[idxEncontrado].quantity += 1;
		};
		
		
		// Envío la nueva cesta
		const resPostCarts = await axios.post("/carts", {
			userId,
			date: new Date().toISOString().split("T")[0], // "2021-12-10T21:06:03.683Z"
			products: cartProductList,
		});
		
		
		return resPostCarts.data;
		
	} catch (error) {
		return console.log(error);
	};
	
};