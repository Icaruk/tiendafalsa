import { useRouting } from 'expo-next-react-navigation';
import { StyleSheet, View } from 'react-native';
import RegisterForm from "app/features/Register/partials/RegisterForm";
import axios from "axios";



export default function Register() {
	
	const routing = useRouting();
	
	
	
	return (
		<View style={styles.container}>
			
			<RegisterForm
				onFinish={ async form => {
					
					try {
						const resPost = await axios.post(
							"https://fakestoreapi.com/users",
							form
						);
						
						const userId = resPost.data.id;
						
						routing.navigate({
							routeName: "Login",
							params: {
								username: form.username,
							},
							web: {
								path: "/login"
							}
						});
						
					} catch (err) {
						console.log( err );
					};
					
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
