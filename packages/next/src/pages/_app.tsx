import '../styles/global.scss'

import 'raf/polyfill'
// @ts-ignore
global.setImmediate = requestAnimationFrame
import 'setimmediate'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useEffect } from 'react';
import axios from 'axios'
import Header from 'app/layout/Header'



export default function App({ Component, pageProps }: AppProps) {
	
	useEffect( () => {
		axios.defaults.baseURL = "https://fakestoreapi.com";
	}, []);
	
	
	
	return (
		<>
			<Head>
				<title>tiendafalsa</title>
				<meta key="title" name="tiendafalsa" content="una tienda falsa" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
				<meta
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
					name="viewport"
				/>
			</Head>

			<Header />
			
			<SafeAreaProvider>
				<Component {...pageProps} />
			</SafeAreaProvider>

		</>
	)
}
