
import axios from "axios";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function LoginForm({
	defaultValues = {
		username: "johnd",
		password: "m38rmF$"
	},
	onFinish,
}) {

	if (!onFinish) throw TypeError("onFinish is required");



	const [form, setForm] = useState(defaultValues);



	const pulsaAcceder = async () => {

		try {
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
			>
				<Text>Acceder</Text>
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
