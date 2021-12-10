// import Link from 'next/link';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-next-react-navigation';


export default function Header() {
	return (
		<View style={styles.container}>
			<View style={styles.nav}>
				
				<Link
					style={styles.navItem}
					routeName=""
					web={{
						path: "/"
					}}
				>
					<Text>Home</Text>
				</Link>
				
				<Link
					style={styles.navItem}
					routeName="Login"
					web={{
						path: "/login"
					}}
				>
					<Text>Login</Text>
				</Link>
				
				<Link
					style={styles.navItem}
					routeName="Profile"
					web={{
						path: "/profile"
					}}
				>
					<Text>Profile</Text>
				</Link>
				
				<Link
					style={styles.navItem}
					routeName="Products"
					web={{
						path: "/products"
					}}
				>
					<Text>Products</Text>
				</Link>
				
				<Link
					style={styles.navItem}
					routeName="Cart"
					web={{
						path: "/cart"
					}}
				>
					<Text>Cart</Text>
				</Link>
				
			</View>
		</View>
	)
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
		justifyContent: "center",
	},
	navItem: {
		padding: 6,
		textAlign: "center",
	},
	subNavItem: {
		padding: 5
	},
	topic: {
		textAlign: "center",
		fontSize: 15
	}
});