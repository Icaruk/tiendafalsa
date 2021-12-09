import Product, { ProductType } from "app/features/Products/partials/Product";
import axios from "axios";
import { useRouting } from 'expo-next-react-navigation';
import React, { useEffect, useState, useMemo } from "react";
import { FlatList, Platform, View, StyleSheet, TextInput  } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import capitalize from "app/utils/capitalize";
const debounce = require("@icaruk/debounce");



function filterProducts (
	products: Array<ProductType>,
	filters: {
		category: string | undefined,
		search: string;
	}
): Array<ProductType> {
	
	return products.filter( _product => {
		
		return (
			(
				!filters.category || // si no está filtrando por categoría 
				(filters.category && _product.category === filters.category) // o si la tiene, que coincida
			) &&
			(
				!filters.search ||
				(filters.search && new RegExp(`.*${filters.search}.*`, "i").test(_product.title))
			)
		);
		
	});
	
};



const categorySelectPlaceholderText = "Filtrar por categoría";



export default function Products() {

	const routing = useRouting();



	const [categoryList, setCategoryList] = useState([]);
	const [productList, setProductList] = useState([]);

	const [filters, setFilters] = useState({ category: undefined, search: ""});
	
	// console.log( "filters", `(${typeof filters}): `, filters);
	
	const filteredProductList = useMemo(() => {
		
		if (!productList) return [];
		if (!filters.category && !filters.search) return productList; // no hay filtros
		
		
		return filterProducts(productList, filters);
		
	}, [productList, filters]);



	useEffect(() => {

		(async () => {
			try {

				const [resCategories, resProducts] = await Promise.all([
					axios.get("https://fakestoreapi.com/products/categories"),
					axios.get("https://fakestoreapi.com/products"),
				]);

				setCategoryList(resCategories.data);
				setProductList(resProducts.data);

			} catch (err) {
				console.log(err);
			};
		})();

	}, []);



	return (

		<View
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>

			<RNPickerSelect
				items={categoryList.map(_categoryName => {
					return {
						label: capitalize(_categoryName),
						value: _categoryName,
					}
				})}
				style={pickerSelectStyles}
				useNativeAndroidPickerStyle={false}
				value={filters.category}
				onValueChange={val => {
					if (val === categorySelectPlaceholderText) val = undefined; // para evitar un aparente bug de la librería, al seleccionar el placeholder a veces asigna el label como value
					setFilters({...filters, category: val})
				}}
				placeholder={{
					label: categorySelectPlaceholderText,
					value: undefined,
				}}
			/>
			
			<TextInput
				style={{
					height: 40,
					margin: 12,
					borderWidth: 1,
					padding: 10,
				}}
				onChangeText={ text => {
					if (text && text.length >= 3) {					
						debounce(
							1000,
							() => setFilters({...filters, search: text}),
							"productSearchFilter"
						);
					};
				}}
			/>
			
			
			
			<FlatList
				data={filteredProductList}
				renderItem={({ index, item, separators }) => {
					return <Product
						productData={item}
						onDetailClick={
							Platform.OS !== "web"
								? null
								: (itemId) => {

									routing.navigate({
										routeName: "ProductDetail",
										params: {
											id: itemId
										},
										web: {
											path: "/productDetail"
										},

									});
								}
						}
						onAddToCartClick={
							Platform.OS === "web"
								? null
								: (itemId) => {
									console.log(`añadiría al carro el ítem ${itemId}`);
								}
						}
					/>
				}}
			/>

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