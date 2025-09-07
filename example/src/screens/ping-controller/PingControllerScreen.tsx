import {
	useRef,
} from 'react'

import {
	Alert,
	useColorScheme,
} from 'react-native'

import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	type TextInputProps,
	type ViewProps,
} from 'react-native'

import {
	getHostAddress,
	getHostname,
} from 'ping-react-native'

import {
	NavigationHooks,
} from '@/hooks'

export function PingControllerScreen(): React.JSX.Element {

	const
		navigation =
			NavigationHooks.useNavigation(),

		ref =
			useRef({
				host: '',
				ttl: '54',
			}),

		onChangeHost: TextInputProps['onChange'] =
			event => {
				ref.current.host = event.nativeEvent.text
			},

		onChangeTTL: TextInputProps['onChange'] =
			event => {
				ref.current.ttl = event.nativeEvent.text
			},

		getHostnameHandler =
			() => {
				getHostname(ref.current.host).then(res => {
					Alert.alert('Hostname: ', res ?? 'null', [
						{
							text: 'Okay',
						},
					])
				})
			},

		getHostAddressHandler =
			() => {
				getHostAddress(ref.current.host).then(res => {
					Alert.alert('Host Address: ', res ?? 'null', [
						{
							text: 'Okay',
						},
					])
				})
			},

		navigateToPingRunner =
			() => {
				navigation.navigate(
					'ping_runner',
					{
						host: ref.current.host,
						ttl: Number(ref.current.ttl),
						// count: Number.POSITIVE_INFINITY,
						count: 16,
					},
				)

				// navigation.navigate(
				// 	'nest_sample',
				// 	{
				// 		screen: 'step_2',
				// 		params: {
				// 			foo: true,
				// 			bar: 0,
				// 			someMessage: 'i love you',
				// 		},
				// 	},
				// )
			}

	return (
		<ScrollView
			style={ Styles.page }
			contentContainerStyle={ Styles.pageContentContainer }
		>
			<TextInputPart
				title="Host"
				textInputProps={{
					placeholder: 'e.g. 1.1.1.1 , google.com , etc.',
					onChange: onChangeHost,
				}}
				style={ Styles.mb4 }
			/>

			<TextInputPart
				title="TTL (for ping only)"
				textInputProps={{
					defaultValue: ref.current.ttl,
					keyboardType: 'number-pad',
					onChange: onChangeTTL,
				}}
				style={ Styles.mb4 }
			/>

			<View>
				<Button
					title="Ping"
					onPress={ navigateToPingRunner }
				/>
				<Button
					title="Get Hostname"
					onPress={ getHostnameHandler }
				/>
				<Button
					title="Get Host Address"
					onPress={ getHostAddressHandler }
				/>
			</View>
		</ScrollView>
	)

}

const Styles = StyleSheet.create({
	page: {
		paddingHorizontal: 16,
	},
	pageContentContainer: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 'auto',
		width: '100%',
		maxWidth: 480,
		alignSelf: 'center',
		justifyContent: 'center',
	},

	flexInitial: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: 'auto',
	},

	textInputPart: {
		padding: 8,
		borderWidth: 1,
		borderColor: '#999999',
	},
	textInputTextLight: {
		color: '#EEEEEE',
	},
	textInputTextDark: {
		color: '#111111',
	},
	textInputPartTitle: {
		fontSize: 14,
		lineHeight: 20,
		marginTop: 4,
	},

	mb4: {
		marginBottom: 16,
	},
})

interface TextInputPartPropsInterface {
	title: string,
	style?: ViewProps['style'],
	textInputProps?: TextInputProps,
}
function TextInputPart({
	title,
	style,
	textInputProps,
}: TextInputPartPropsInterface): React.JSX.Element {

	const
		colorScheme =
			useColorScheme(),

		textStyle =
			colorScheme === 'dark'
				? Styles.textInputTextLight
				: Styles.textInputTextDark

	return (
		<View
			style={ [Styles.flexInitial, Styles.textInputPart, style] }
		>
			<Text style={ [textStyle, Styles.textInputPartTitle] }>
				{ title }
			</Text>

			<TextInput
				{ ...textInputProps }
				style={ [
					textStyle,
					textInputProps?.style,
				] }
			/>
		</View>
	)

}
