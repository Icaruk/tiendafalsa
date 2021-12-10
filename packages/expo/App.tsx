import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'app/features/Login';
import ProductDetail from 'app/features/ProductDetail';
import Cart from 'app/features/Cart';
import Register from 'app/features/Register';
import Profile from 'app/features/Profile';
import Products from 'app/features/Products';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { enableScreens } from 'react-native-screens';



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
const CartScreen = () => <Cart />
const RegisterScreen = () => <Register />
const ProfileScreen = () => <Profile />



export default function App() {
	
	useEffect( () => {
		axios.defaults.baseURL = "https://fakestoreapi.com";
	}, []);
	
	
	//! PENDIENTE buscar cómo hacer un header común en React Native
	
	return (<>
		<NavigationContainer>		
			
			{/* <Header /> */}
			
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Products" component={ProductsScreen} />
				<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
				<Stack.Screen name="Cart" component={CartScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	</>);
	
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