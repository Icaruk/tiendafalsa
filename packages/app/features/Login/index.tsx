import { Platform, View, Text, StyleSheet } from 'react-native'
import LoginForm from "app/features/Login/partials/LoginForm"
import {useNavigation} from "@react-navigation/native";
import {Router} from "next/router";
import { useRouting } from 'expo-next-react-navigation';



export default function Login() {
	
	const routing = useRouting();
	
	
	
	return (
		<View style={styles.container}>
			<Text>hola</Text>
			<LoginForm
				onFinish={ response => {
					
					if (!response) return;
					
					routing.navigate({
						routeName: "Products",
						web: {
							path: "/products"
						}
						
					});
				}}
			/>
		</View>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
