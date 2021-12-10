
import React from 'react';
import { Image, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';



export type CartItemType = {
	id: number,
	title: string,
	price: number,
	description: string,
	image: string,
	category: string,
	quantity: number,
};

export type CartItemProps = {
	cartItemData: CartItemType,
	onChangeQuantity?: Function, // id, change
	loading?: boolean,
	maxQuantity?: number,
};



export default function CartItem({
	cartItemData,
	onChangeQuantity,
	loading = false,
	maxQuantity = 10,
}: CartItemProps) {
	
	return (
		
		<TouchableHighlight
			activeOpacity={0.8}
			underlayColor="#DDDDDD"
		>
			<View
				style={{
					padding: 32,
				}}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: "row",
						justifyContent: 'center',
						alignItems: 'center',
						padding: 20,
					}}
				>
					<View>
						<Image
							style={{
								width: 64,
								height: 64
							}}
							source={{
								uri: cartItemData?.image,
							}}
						/>
					</View>
					
					
					
					<View
						style={{
							alignSelf: 'center',
							width: 240,
							marginLeft: 16,
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: 'bold',
								textAlign: 'left',
							}}
						>
							{cartItemData?.title ?? "NO_TITTLE"}
						</Text>
						
						<Text
							style={{
								fontSize: 12,
								fontWeight: 'bold',
								textAlign: 'left',
								color: '#0066FF',
							}}
						>
							{cartItemData?.category}
						</Text>
						
					</View>
					
				</View>
			
			
				<View
					style={{
						display: 'flex',
						flexDirection: "row",
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>

					{ onChangeQuantity && 
						<View
							style={{
								display: 'flex',
								flexDirection: "row",
								alignItems: 'center',
								marginTop: 8,
							}}
						>
							<TouchableOpacity
								style={{
									alignItems: "center",
									backgroundColor: "#FF5F5F",
									padding: 10,
									height: 35,
									width: 35,
									borderRadius: 32,
								}}
								disabled={loading}
								onPress={ () => {
									onChangeQuantity(cartItemData.id, -1)
								}}
							>
								<Text>{ cartItemData.quantity === 1 ? "🗑️" : "➖"}</Text>
							</TouchableOpacity>
							
							<Text
								style={{
									padding: 10,
									fontSize: 18,
								}}
							>{cartItemData?.quantity ?? 0}</Text>
							
							<TouchableOpacity
								style={{
									alignItems: "center",
									backgroundColor: "#5CFF54",
									padding: 10,
									height: 35,
									width: 35,
									borderRadius: 32,
								}}
								disabled={loading || cartItemData.quantity >= maxQuantity}
								onPress={ () => {
									onChangeQuantity(cartItemData.id, 1)
								}}
							>
								<Text>➕</Text>
							</TouchableOpacity>
						</View>
					}
					
					<Text
						style={{
							fontSize: 24,
							fontWeight: 'bold',
						}}
					>
						{
							(cartItemData?.price * cartItemData?.quantity)
							.toFixed(2)
							.padEnd(2, "0")
						} €
					</Text>
					
					
					
					<Text
						style={{
							color: "grey",
						}}
					>{cartItemData?.price ?? 0} €/u</Text>
					
				</View>
			
			</View>
			
		</TouchableHighlight>
			
	);
}
