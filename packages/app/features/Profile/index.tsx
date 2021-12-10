import RegisterForm from "app/features/Register/partials/RegisterForm";
import axios from "axios";
import { useRouting } from 'expo-next-react-navigation';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Profile() {
	
	const routing = useRouting();
	
	
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState(null);
	const [editable, setEditable] = useState(false);
	
	
	useEffect( () => {
		
		( async () => {
			
			try {
				setLoading(true);
				const resGet = await axios.get( '/users/1' );
				setUserData( resGet.data );
			} catch (error) {
				console.log(error);
			};
			
			setLoading(false);
			
			
		})();
		
	}, []);
	
	
	
	return (
		<View style={styles.container}>
			
			<TouchableOpacity
				style={{
					alignItems: "center",
					backgroundColor: "#FF5F5F",
					padding: 10,
					height: 35,
					width: 200,
					borderRadius: 32,
				}}
				onPress={ () => setEditable(!editable) }
			>
				<Text>{editable ? "Dejar de editar" : "Editar"}</Text>
			</TouchableOpacity>
			
			{ loading 
				? <Text>Cargando...</Text>
				: <RegisterForm
					editable={editable}
					buttonText='Modificar datos'
					defaultValues={{
						email: userData?.email,
						username: userData?.username,
						phone: userData?.phone,
						password: "",
						password2: "",
						firstName: userData?.name?.firstname,
						lastName: userData?.name?.lastname,
						city: userData?.address?.city,
						street: userData?.address?.street,
						streetNumber: userData?.address?.number,
						zipcode: userData?.address?.zipcode,
					}}
					onFinish={ async form => {
						
						try {
							const resPost = await axios.put(
								"https://fakestoreapi.com/users/1",
								form
							);
							
							setUserData(resPost.data);
							setEditable(false);
							
						} catch (err) {
							console.log( err );
						};
						
					}}
				/>
			}
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
