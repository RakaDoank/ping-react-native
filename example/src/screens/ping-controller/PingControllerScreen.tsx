import {
	useRef,
} from 'react'

import {
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
			})

	const onChangeHost: TextInputProps['onChange'] = event => {
		ref.current.host = event.nativeEvent.text
	}

	const onChangeTTL: TextInputProps['onChange'] = event => {
		ref.current.ttl = event.nativeEvent.text
	}

	const navigateToPingRunner = () => {
		navigation.navigate(
			'ping_runner',
			{
				host: ref.current.host,
				ttl: Number(ref.current.ttl),
				// count: Number.POSITIVE_INFINITY,
				count: 3,
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
				title="TTL"
				textInputProps={{
					defaultValue: ref.current.ttl,
					keyboardType: 'number-pad',
					onChange: onChangeTTL,
				}}
				style={ Styles.mb4 }
			/>

			<Button
				title="Ping"
				onPress={ navigateToPingRunner }
			/>
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
