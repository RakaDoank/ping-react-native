/**
 * @format
 */

import {
	AppRegistry,
} from "react-native"

import {
	name as appName,
} from "./app.json"

import {
	MacOS,
} from "./src/MacOS"

AppRegistry.registerComponent(appName, () => MacOS);
