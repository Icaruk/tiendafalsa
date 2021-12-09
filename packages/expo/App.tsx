import { NavigationContainer } from '@react-navigation/native';
import Login from 'app/features/Login';
import Products from 'app/features/Products';
import ProductDetail from 'app/features/ProductDetail';
import React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { enableScreens } from 'react-native-screens';
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouting } from 'expo-next-react-navigation'



enableScreens(true);



const Stack = createNativeStackNavigator();


function HomeScreen({navigation}) {
	
	
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Go to login"
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	);
}



const LoginScreen = () => <Login />;
const ProductsScreen = () => <Products />
const ProductDetailScreen = () => <ProductDetail />



export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Products" component={ProductsScreen} />
				<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
	
}


const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		padding: 10
	},
	header: {
		fontSize: 20
	},
	nav: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 40,
	},
	navItem: {
		flex: 1,
		alignItems: "center",
		padding: 10
	},
	subNavItem: {
		padding: 5
	},
	topic: {
		textAlign: "center",
		fontSize: 15
	}
});