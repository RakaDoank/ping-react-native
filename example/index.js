/**
 * @format
 */

import {
	AppRegistry,
} from 'react-native'

import {
	name as appName,
} from './app.json'

import {
	ExampleApp,
} from './src/ExampleApp'

AppRegistry.registerComponent(appName, () => ExampleApp);
