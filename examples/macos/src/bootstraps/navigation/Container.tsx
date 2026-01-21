import {
	useContext,
} from "react"

import {
	DialogProvider,
	ThemeContext,
	type ThemeType,
} from "@audira/carbon-react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native"

import {
	createStackNavigator,
} from "@react-navigation/stack"

import {
	HomeScreen,
	ICMPInputsScreen,
	TestICMPScreen,
	TestUseICMPScreen,
} from "../../screens"

import type {
	NavigationType,
} from "../../types"

const
	Stack =
		createStackNavigator<NavigationType.Stacks>()

export function Container() {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<NavigationContainer
			theme={{
				...DefaultTheme,
				colors: {
					...DefaultTheme.colors,
					background: mapBackgroundColor[themeContext.colorScheme],
				},
			}}
		>
			<Stack.Navigator
				initialRouteName="home"
				screenOptions={{
					headerShown: false,
				}}
				screenLayout={ ScreenLayout }
			>
				<Stack.Screen
					name="home"
					component={ HomeScreen.Page }
				/>

				<Stack.Screen
					name="icmp_inputs"
					component={ ICMPInputsScreen.Page }
				/>

				<Stack.Screen
					name="test_icmp"
					component={ TestICMPScreen.Page }
				/>

				<Stack.Screen
					name="test_use_icmp"
					component={ TestUseICMPScreen.Page }
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)

}

const
	mapBackgroundColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.background,
			gray_100: Color.Token.gray_100.background,
		}

interface ScreenLayoutProps {
	children?: React.ReactNode,
}
function ScreenLayout({
	children,
}: ScreenLayoutProps) {

	return (
		<DialogProvider>
			{ children }
		</DialogProvider>
	)

}
