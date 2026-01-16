import {
	useContext,
} from "react"

import {
	Stack,
} from "expo-router"

import {
	CarbonReactNative,
	DialogProvider,
	ThemeContext,
	type ThemeType,
} from "@audira/carbon-react-native"

import {
	Color,
} from "@audira/carbon-react-native-elements"

import {
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"

import {
	SafeAreaProvider,
} from "react-native-safe-area-context"

export default function Layout({
	children,
}: {
	children?: React.ReactNode,
}) {

	return (
		<SafeAreaProvider>
			<CarbonReactNative>
				<ReactNavigationThemeProvider>
					<Stack
						// eslint-disable-next-line react/no-unstable-nested-components
						screenLayout={ ({ children }) => {
							return (
								<DialogProvider>
									{ children }
								</DialogProvider>
							)
						} }
						screenOptions={{
							headerShown: false,
						}}
					>
						{ children }
					</Stack>
				</ReactNavigationThemeProvider>
			</CarbonReactNative>
		</SafeAreaProvider>
	)

}

interface ReactNavigationThemeProviderProps {
	children?: React.ReactNode,
}

function ReactNavigationThemeProvider({ children }: ReactNavigationThemeProviderProps) {

	const
		themeContext =
			useContext(ThemeContext)

	return (
		<ThemeProvider
			value={{
				...DefaultTheme,
				colors: {
					...DefaultTheme.colors,
					background: mapBackgroundColor[themeContext.colorScheme],
				},
			}}
		>
			{ children }
		</ThemeProvider>
	)

}

const
	mapBackgroundColor: Record<ThemeType.ColorScheme, string> =
		{
			gray_10: Color.Token.gray_10.background,
			gray_100: Color.Token.gray_100.background,
		}
