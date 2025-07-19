/**
 * @format
 */

import {
	AppRegistry,
} from 'react-native'

import {
	ExampleApp,
} from './src/ExampleApp'

import {
	name as appName,
} from './app.json'

AppRegistry.registerComponent(appName, () => ExampleApp);
