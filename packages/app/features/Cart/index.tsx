import axios from "axios";
import { Link } from 'expo-next-react-navigation';
import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ProductType } from "../Products/partials/Product";
import CartItem from "./partials/CartItem";



export default function Cart() {

	const [loading, setLoading] = useState<boolean>(true);
	const [loadingCartUpdate, setLoadingCartUpdate] = useState<boolean>(false);
	const [cartList, setCartList] = useState([]);
	
	
	
	const changeCartItemQuantity = useCallback( async (cartItemId, change) => {
		
		try {
		
			const idxEncontrado = cartList.findIndex( _cartItem => _cartItem.id === cartItemId );
			if (idxEncontrado === -1) return console.log( `Ítem del la cesta con id ${cartItemId} no encontrado.` );
			
			const newCartList = [...cartList];
			const newQuantity = newCartList[idxEncontrado].quantity + change;
			
			if (newQuantity <= 0) {
				newCartList.splice(idxEncontrado, 1);
			} else {
				newCartList[idxEncontrado].quantity = Math.min(10, newQuantity);
			};
			
			setLoadingCartUpdate(true);
			
			const res = await axios.put("/carts/1", {
				userId: 1, // hardcodeado porque el login no me da mi id de usuario
				date: new Date().toISOString().split("T")[0], // "2021-12-10T21:06:03.683Z"
				products: newCartList,
			});
			
			
			setCartList( newCartList );
		
		} catch (err) {
			console.log( err );
		};
		
		setLoadingCartUpdate(false);
		
	}, [cartList]);
	
	
	
	useEffect(() => {
		
		(async () => {
			try {
				
				setLoading(true);
				const res = await axios.get("/carts/user/1");
				
				
				// Ahora tengo {productId, quantity} me faltan los datos del producto
				const cartProductList: Array<{productId: number, quantity: number}> = res.data[0].products;
				
				const promises = cartProductList.map( ({productId}) => {
					return axios.get(`/products/${productId}`);
				});
				
				
				// Extraigo datos (de axios viene {data})
				const resPromises = await Promise.all(promises);
				
				const products:Array<ProductType> = resPromises.map( _product => {
					
					const product = _product.data;
					
					// Busco la cantidad en cartProductList
					const encontrado = cartProductList.find( ({productId}) => productId === product.id);
					
					if (encontrado) product.quantity = encontrado.quantity;
					else product.quantity = 0;
					
					return product;
				});
				
				
				setCartList(products);
				
			} catch (err) {
				console.log(err);
			};
			
			setLoading(false);
			
		})();
		
	}, []);
	
	
	
	return (
		
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			
			<Link
				style={{
					padding: 16,
					textAlign: "center",
				}}
				routeName="Products"
				web={{
					path: "/products"
				}}
			>
				<Text>← Buscar más productos</Text>
			</Link>
			
			<TouchableOpacity
				style={{
					alignItems: "center",
					backgroundColor: "orange",
					padding: 10,
					height: 35,
					width: 400,
					borderRadius: 32,
				}}
			>
				<Text
					style={{fontWeight: "bold"}}
				>
					Realizar compra →
				</Text>
			</TouchableOpacity>
			
			
			
			{ loading
				? (
					<Text style={{textAlign: "center"}}>
						Loading...
					</Text>
				)
				
				: (
					<FlatList
						style={{
							marginTop: 16,
						}}
						data={cartList}
						renderItem={({ index, item, separators }) => {
							return <Text
								style={{
									textAlign: "center",
								}}
							>
								<CartItem
									cartItemData={item}
									onChangeQuantity={ changeCartItemQuantity }
									loading={loadingCartUpdate}
								/>
							</Text>
						}}
					/>
				)
			}
			
			
		</View>

	)
}



const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'gray',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});