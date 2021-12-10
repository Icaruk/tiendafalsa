
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { validame } from "validame";
import capitalize from "../../../utils/capitalize";



function validateForm(form) {
	
	return {
		email: validame(form.email, {
			req: 2,
			allow: "email"
		}),
		username: validame(form.username, {
			req: 2,
			min: 3,
			max: 32,
			allow: "a"
		}),
		phone: validame(form.phone, {
			req: 2,
			allowOr: "phoneEs mobileEs",
		}),
		password: validame(form.password, {
			req: 2,
			min: 1,
			max: 64,
		}),
		password2: form.password === form.password2 ? "" : "Las contraseñas no coinciden",
		city: validame(form.city, {
			req: 2,
			min: 1,
			allow: "aA ñÑ _ !"
		}),
		street: validame(form.street, {
			req: 2,
			min: 1,
			allow: "aA ñÑ 1 _ !"
		}),
		streetNumber: validame(form.streetNumber, {
			req: 2,
			min: 1,
			allow: "1"
		}),
		zipcode: validame(form.zipcode, {
			req: 2,
			minMax: 5,
			allow: "1"
		}),
	};
	
};



export default function RegisterForm({
	defaultValues = {
		email: "",
		username: "",
		phone: "",
		password: "",
		password2: "",
		firstName: "",
		lastName: "",
		city: "",
		street: "",
		streetNumber: "",
		zipcode: "",
	},
	editable = true,
	buttonText = "Registrarse",
	onFinish,
}) {
	
	if (!onFinish) throw TypeError("onFinish is required");
	
	
	const [cargando, setCargando] = useState(false);
	const [form, setForm] = useState(defaultValues);
	const [errors, setErrors] = useState({});
	
	
	
	const pulsaRegistrarse = async () => {
		
		try {
			
			const errores = validateForm(form);
			setErrors(errores);
			
			
			const hayErrores = Object.values(errores).some(error => !!error); // si hay algo truthy, es que hay error, "" significa que no hay error
			if (hayErrores) return;
			
			
			onFinish({
				email: form.email,
				username: form.username,
				phone: form.phone,
				password: form.password,
				name: {
					firstname: form.firstName,
					lastname: form.lastName,
				},
				address: {
					city: form.city,
					street: form.street,
					number: +form.streetNumber,
					zipcode: form.zipcode,
					geolocation: { //! PENDIENTE
						lat: "0",
						long: "0",
					}
				}
			});
			
		} catch (err) {
			onFinish(null);
		};
		
		setCargando(false);
		
	};
	
	
	
	const arrStrErrores = useMemo( () => {
		
		if (!errors) return [];
		
		const arrStr = [];
		
		Object.entries(errors).forEach( ([_key, _val]) => {
			if (_val) arrStr.push(`${capitalize(_key)}: ${_val}`);
		});
		
		return arrStr;
		
	}, [errors]);
	
	
	
	const inputStyle: any = {
		borderWidth: editable ? 1 : 0,
		height: 32,
		width: 200,
		marginBottom: 8,
		textAlign: editable ? null : "center",
	};
	
	
	return (
		<ScrollView>
			
			<Text style={styles.inputLabel}>Email</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, email: val })}
				value={form.email}
			/>
			
			<Text style={styles.inputLabel}>Username</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, username: val })}
				value={form.username}
			/>
			
			<Text style={styles.inputLabel}>Teléfono</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, phone: val })}
				value={form.phone}
			/>
			
			{ editable && <>
				<Text style={styles.inputLabel}>Contraseña</Text>
				<TextInput
					editable={editable}
					style={inputStyle}
					onChangeText={val => setForm({ ...form, password: val })}
					value={form.password}
					secureTextEntry
				/>
				
				<Text style={styles.inputLabel}>Repite la contraseña</Text>
				<TextInput
					editable={editable}
					style={inputStyle}
					onChangeText={val => setForm({ ...form, password2: val })}
					value={form.password2}
					secureTextEntry
				/>
			</>}
			
			
			<Text style={styles.inputLabel}>Ciudad</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, city: val })}
				value={form.city}
			/>
			
			<Text style={styles.inputLabel}>Calle</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, street: val })}
				value={form.street}
			/>
			
			<Text style={styles.inputLabel}>Número</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, streetNumber: val })}
				value={"" + form.streetNumber}
			/>
			
			<Text style={styles.inputLabel}>Código postal</Text>
			<TextInput
				editable={editable}
				style={inputStyle}
				onChangeText={val => setForm({ ...form, zipcode: val })}
				value={form.zipcode}
			/>
			
			
			<View
				style={{
					padding: 10,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{ arrStrErrores.map( (_err, _idx) => {
					return <Text
						key={_idx}
						style={{
							alignSelf: "stretch",
							width: "100%",
							color: "red",
							fontSize: 12,
						}}
					>
						{_err}
					</Text>
				}) }
			</View>
			
			
			{ editable && 
				<TouchableOpacity
					style={{
						alignItems: "center",
						backgroundColor: "#DDDDDD",
						padding: 10,
						height: 40,
						width: 200,
						marginTop: 16,
					}}
					onPress={pulsaRegistrarse}
					disabled={cargando}
				>
					<Text>
						{buttonText}
					</Text>
				</TouchableOpacity>
			}

		</ScrollView>
	);
}



const styles = StyleSheet.create({
	inputLabel: {
		color: "grey",
	},
	button: {
		height: 32,
		width: 200,
	}
});
