import LoginForm from "app/features/Login/partials/LoginForm";
import axios from "axios";
import { useRouting } from 'expo-next-react-navigation';
import { StyleSheet, View } from 'react-native';



export default function Login() {
	
	const routing = useRouting();
	const paramUsername = routing.getParam<string>('username');
	
	
	return (
		<View style={styles.container}>
			
			<LoginForm
				defaultValues={{
					username: paramUsername ?? "johnd",
					password: paramUsername ? "" : "m38rmF$",
				}}
				onFinish={ response => {
					
					if (!response) return;
					if (response.token) {
						axios.defaults.baseURL = "https://fakestoreapi.com";
						axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`; // parece que no hace falta
					};
					
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
