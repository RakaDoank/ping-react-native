import {
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'

export default function App() {

	const
		isDarkMode =
			useColorScheme() === 'dark'

	return (
		<View style={ styles.container }>
			<StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' }/>

			<View>
				<Text>
					First Init
				</Text>
			</View>
		</View>
	)

}

const
	styles =
		StyleSheet.create({
			container: {
				flex: 1,
				paddingVertical: '10%',
			},
			textBold: {
				fontWeight: 'bold',
			},
		})
