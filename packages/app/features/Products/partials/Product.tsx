
import React from 'react';
import { Image, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';



export type ProductType = {
	id: number,
	title: string,
	price: number,
	description: string,
	image: string,
	category: string,
};

export type ProductProps = {
	productData: ProductType,
	onDetailClick?: Function,
	onAddToCartClick?: Function,
	isDetail?: boolean,
};



export default function Product({
	productData,
	onDetailClick,
	onAddToCartClick,
	isDetail = false,
}: ProductProps) {
	
	return (
		
		<TouchableHighlight
			activeOpacity={0.8}
			underlayColor="#DDDDDD"
			onPress={ () => {
				if (onDetailClick) {
					onDetailClick(productData?.id);
				};
			}}
		>
			<View
				style={{
					display: 'flex',
					flexDirection: "column",
					justifyContent: 'center',
					alignItems: 'center',
					padding: 20,
				}}
			>
				<Image
					style={{width: 100, height: 100}}
					source={{
						uri: productData?.image,
					}}
				/>
				
				<Text
					style={{
						fontSize: 18,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					{productData?.title ?? "NO_TITTLE"}
				</Text>
				
				<Text
					style={{
						fontSize: 14,
						fontWeight: 'bold',
						textAlign: 'center',
						color: '#0066FF',
					}}
				>
					{productData?.category}
				</Text>
				
				<Text>{productData?.price ?? 0} €</Text>
				
				
				<Text
					numberOfLines={isDetail ? null : 1}
					style={{
						color: "grey",
						marginTop: 8,
					}}
				>
					{productData?.description}
				</Text>
				
				
				{ onAddToCartClick && 
					<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: "#FFC107",
							padding: 10,
							height: 40,
							width: 200,
							marginTop: 16,
							borderRadius: 32,
						}}
						onPress={ () => {
							onAddToCartClick(productData.id)
						}}
					>
						<Text>Añadir a la cesta</Text>
					</TouchableOpacity>
				}
				
				{ isDetail && <>
					
				</>}
				
			</View>
		</TouchableHighlight>
			
	);
}
