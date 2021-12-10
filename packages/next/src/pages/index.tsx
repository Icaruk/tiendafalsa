import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from 'react-native-screens';



enableScreens(true)



export default function App() {
	return (
		<View style={styles.container}>
			<Text>Tienda falsa home</Text>
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
		justifyContent: "space-around"
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