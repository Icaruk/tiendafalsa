
import axios from "axios";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouting } from 'expo-next-react-navigation';



export default function LoginForm({
	defaultValues = {
		username: "",
		password: ""
	},
	onFinish,
}) {
	
	const routing = useRouting();
	
	
	
	if (!onFinish) throw TypeError("onFinish is required");
	
	
	const [cargando, setCargando] = useState(false);
	const [form, setForm] = useState(defaultValues);



	const pulsaAcceder = async () => {

		try {
			
			setCargando(true);
			const res = await axios.post(
				"https://fakestoreapi.com/auth/login",
				{
					username: form.username,
					password: form.password,
				}
			);

			onFinish(res.data);

		} catch (err) {
			onFinish(null);
		};
		
		setCargando(false);
		
	};



	return (
		<View style={styles.container}>

			<Text>Usuario</Text>
			<TextInput
				style={styles.input}
				onChangeText={val => setForm({ ...form, username: val })}
				value={form.username}
			/>

			<Text>Contraseña</Text>
			<TextInput
				style={styles.input}
				onChangeText={val => setForm({ ...form, password: val })}
				value={form.password}
				secureTextEntry
			/>

			<TouchableOpacity
				style={{
					alignItems: "center",
					backgroundColor: "#DDDDDD",
					padding: 10,
					height: 40,
					width: 200,
					marginTop: 16,
				}}
				onPress={pulsaAcceder}
				disabled={cargando}
			>
				<Text>
					{ cargando ? "Accediendo..." : "Acceder ➡️"}
				</Text>
			</TouchableOpacity>
			
			<TouchableOpacity
				style={{
					alignItems: "center",
					backgroundColor: "#DDDDDD",
					padding: 10,
					height: 40,
					width: 200,
					marginTop: 16,
				}}
				onPress={ () => {
					routing.navigate({
						routeName: "Register",
						web: {
							path: "/register"
						}
						
					});
				}}
			>
				<Text>
					📋 Registrarse
				</Text>
			</TouchableOpacity>

		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		height: 32,
		width: 200,
	},
	button: {
		height: 32,
		width: 200,
	}
});
