import axios from "axios";
import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Product from "app/features/Products/partials/Product";
import {ProductType} from "app/features/Products/partials/Product";
import { useRouting } from 'expo-next-react-navigation';



export type ProductDetailProps = {
	product: ProductType,
	productId: number,
};



/**
 * Si se le da `productId`, se busca el producto en la API. De lo contrario se pinta con los datos de `product`.
*/
// export default function ProductDetail({
// 	product,
// 	productId,
// }: ProductDetailProps) {
export default function ProductDetail() {
	
	const routing = useRouting();
	
	
	
	// const [productDetail, setProductDetail] = useState<ProductType>(product);
	const [productDetail, setProductDetail] = useState(null);
	
	
	
	useEffect(() => {
		
		( async () => {
			try {
				
				const productId = routing.getParam("id");
				
				if (productId) {
					const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
					setProductDetail(res.data);
				};
			} catch (err) {
				console.log(err);
			};
		})();
		
	}, []);
	
	
	
	return (
		<Product
			productData={productDetail}
			isDetail={true}
			onAddToCartClick={ productId => {
				console.log( `Añadiría al carro el ítem ${productId}` );
			}}
		/>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
