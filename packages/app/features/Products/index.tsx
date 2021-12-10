import addToCart from "app/features/Cart/functions/addToCart";
import Product, { ProductType } from "app/features/Products/partials/Product";
import capitalize from "app/utils/capitalize";
import axios from "axios";
import { Link, useRouting } from 'expo-next-react-navigation';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';



function filterProducts (
	products: Array<ProductType>,
	filters: {
		category: string | undefined,
		search: string;
	},
	sort: {
		by: string | undefined,
		order: string,
	}
): Array<ProductType> {
	
	let newProducts = [...products];
	
	
	
	if (filters.search || filters.category !== "todas") {
		newProducts = products.filter( _product => {
			return (
				(
					filters.category === "todas" || // si no está filtrando por categoría 
					(filters.category && _product.category === filters.category) // o si la tiene, que coincida
				) &&
				(
					!filters.search || // no está buscando nada
					(filters.search && new RegExp(`.*${filters.search}.*`, "i").test(_product.title)) // o si lo está haciendo, que coincida con el título
				)
			);
		});
	};
	
	
	if (sort.by) {
		newProducts.sort( (a, b) => {
			switch (true) {
				case a[sort.by] < b[sort.by]: return sort.order === "asc" ? -1 : 1;
				case a[sort.by] > b[sort.by]: return sort.order === "asc" ? 1 : -1;
				default: return 0;
			};
		});
	};
	
	
	
	return newProducts;
	
};



const categorySelectPlaceholderText = "Filtrar por categoría";
const sortSelectPlaceholderText = "Ordenar por...";
const orderSelectPlaceholderText = "Orden";


const defaultFilters = { category: "todas", search: ""};


export default function Products() {

	const routing = useRouting();



	const [loading, setLoading] = useState<boolean>(true);
	const [categoryList, setCategoryList] = useState([]);
	const [productList, setProductList] = useState([]);

	const [filters, setFilters] = useState(defaultFilters);
	const [sort, setSort] = useState({ by: undefined, order: "asc"});
	
	
	const filteredProductList = useMemo(() => {
		
		if (!productList) return [];
		// if (!filters.category && !filters.search) return productList; // no hay filtros
		
		return filterProducts(productList, filters, sort);
		
	}, [productList, filters, sort]);
	
	
	
	const pulsaRestaurarFiltros = useCallback(
		() => setFilters(defaultFilters),
		[filters, categoryList]
	);
	
	
	
	useEffect(() => {
		
		(async () => {
			try {
				
				setLoading(true);
				const [resCategories, resProducts] = await Promise.all([
					axios.get("/products/categories"),
					axios.get("/products"),
				]);
				
				setCategoryList(resCategories.data);
				setProductList(resProducts.data);
				
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
			}}
		>
			
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Link
					style={{
						padding: 16,
						textAlign: "center",
					}}
					routeName="Cart"
					web={{
						path: "/cart"
					}}
				>
					<Text>Cesta</Text>
				</Link>
				
				<Link
					style={{
						padding: 16,
						textAlign: "center",
					}}
					routeName="Profile"
					web={{
						path: "/profile"
					}}
				>
					<Text>Perfil</Text>
				</Link>
			</View>
			
			<RNPickerSelect
				items={[
					{
						label: "Todas las categorías",
						value: "todas",
					},
					...categoryList.map(_categoryName => {
						return {
							label: capitalize(_categoryName),
							value: _categoryName,
						}
					})
				]}
				style={pickerSelectStyles}
				useNativeAndroidPickerStyle={false}
				value={filters.category}
				onValueChange={val => {
					if (val === categorySelectPlaceholderText) val = undefined; // para evitar un aparente bug de la librería, al seleccionar el placeholder a veces asigna el label como value
					setFilters({...filters, category: val})
				}}
				placeholder={{}}
			/>
			
			<TextInput
				style={{
					height: 32,
					margin: 12,
					borderWidth: 1,
					padding: 8,
				}}
				placeholder="Buscar producto por título"
				value={filters.search}
				onChangeText={ text => {
					setFilters({...filters, search: text})
				}}
			/>
			
			
			
			<View
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<RNPickerSelect
					items={[
						{
							label: "Precio",
							value: "price",
						},
						{
							label: "Título",
							value: "title",
						},
					]}
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false}
					value={sort.by}
					onValueChange={val => {
						if (val === sortSelectPlaceholderText) val = undefined; // para evitar un aparente bug de la librería, al seleccionar el placeholder a veces asigna el label como value
						setSort({...sort, by: val})
					}}
					placeholder={{
						label: sortSelectPlaceholderText,
						value: undefined,
					}}
				/>
				<RNPickerSelect
					items={[
						{
							label: "Ascendente",
							value: "asc",
						},
						{
							label: "Descendente",
							value: "desc",
						},
					]}
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false}
					value={sort.order}
					onValueChange={val => {
						if (val === orderSelectPlaceholderText) val = undefined; // para evitar un aparente bug de la librería, al seleccionar el placeholder a veces asigna el label como value
						setSort({...sort, order: val})
					}}
					placeholder={{}}
				/>
			</View>
			
			
			<TouchableOpacity
				style={{
					alignItems: "center",
					backgroundColor: "#FF5F5F",
					padding: 8,
					height: 32,
					width: 250,
					borderRadius: 32,
				}}
				onPress={pulsaRestaurarFiltros}
			>
				<Text>Restaurar filtros</Text>
			</TouchableOpacity>
			
			
			
			{ loading
				? (
					<Text style={{textAlign: "center"}}>
						Loading...
					</Text>
				)
				
				: (
					<>
						<Text>Mostrando {filteredProductList.length} de {productList.length} productos</Text>
					
						<FlatList
							style={{
								marginTop: 16,
							}}
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
												addToCart(1, itemId);
											}
									}
								/>
							}}
						/>
					</>
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