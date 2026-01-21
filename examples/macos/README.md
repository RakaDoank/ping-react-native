This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Patches

## macOS related patches
This monorepo setup breaks the react-native scripts. All those scripts point to the wrong node_modules path. **Please patch it after pod installation**

#### `/ping-react-native/examples/macos/macos/Pods/Pods.xcodeproj/project.pbxproj`
Update the `REACT_NATIVE_PATH = "${PODS_ROOT}/../../node_modules/react-native";` to `REACT_NATIVE_PATH = "${PODS_ROOT}/../../../../node_modules/react-native";`

#### `/ping-react-native/examples/macos/macos/pingreactnativemacos.xcodeproj/project.pbxproj`
- On the `export NODE_BINARY=...`, change it to `export NODE_BINARY=node\n../../../node_modules/react-native-macos/scripts/react-native-xcode.sh\n`
- Find `REACT_NATIVE_PATH = "${PODS_ROOT}/../../node_modules/react-native";`, i found two results, likely for debug and release, change it to `REACT_NATIVE_PATH = "${PODS_ROOT}/../../../node_modules/react-native-macos";`

If you have any solutions better than this patches. Please, feel free to fix this.

I'm sorry for my lack of knowledge about iOS/macOS app build system.

## react-native-macos mismatch React version
This monorepo use single React package that is also used by Expo example project. For a while, just override the version checker

Find these files:
- /node_modules/react-native-macos/Libraries/Renderer/implementations/ReactNativeRenderer-dev.js
- /node_modules/react-native-macos/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js
- /node_modules/react-native-macos/Libraries/Renderer/implementations/ReactNativeRenderer-profiling.js

In your IDE or any text editors, find this `if ("19.1.4" !== isomorphicReactPackageVersion)` snippet. Just remove or mark as comment the whole if statement block.

> I'm sorry, I don't make a `pnpm` patch yet.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
npm start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your app:

For macOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```
> :warning: Please see [macOS related patches](#macos-related-patches) after every pod installation

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
npm run macos
```

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
