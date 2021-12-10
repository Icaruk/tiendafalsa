import axios from "axios";
import React, {useEffect, useState} from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import Product from "app/features/Products/partials/Product";
import {ProductType} from "app/features/Products/partials/Product";
import { useRouting } from 'expo-next-react-navigation';
import addToCart from "../Cart/functions/addToCart";



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
	const [loading, setLoading] = useState<boolean>(true);
	const [productDetail, setProductDetail] = useState(null);
	
	
	
	useEffect(() => {
		
		( async () => {
			try {
				
				const productId = routing.getParam("id");
				console.log( "productId", `(${typeof productId}): `, productId);
				
				if (productId) {
					setLoading(true);
					const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
					setProductDetail(res.data);
				};
			} catch (err) {
				console.log(err);
			};
			
			setLoading(false);
		})();
		
	}, []);
	
	
	
	if (loading) return <Text style={{textAlign: "center"}}>
		Loading...
	</Text>;
	
	
	
	return (
		<Product
			productData={productDetail}
			isDetail={true}
			onAddToCartClick={ productId => {
				addToCart(1, productId);
			}}
		/>
	);
};


