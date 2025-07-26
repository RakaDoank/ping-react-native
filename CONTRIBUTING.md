# Contributing
Thank you for your support to this library. This documentation will help you how to contribute to this library. There are some requirements and conventions that we and i must fill and follow.

## Envionments
Before you clone this repository, you need to add these in your machine
- [Node.js](https://nodejs.org) >=20
- [PNPM](https://pnpm.io) >= 10
- [Visual Studio Code](https://code.visualstudio.com) (Optional)
  - [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Android Studio](https://developer.android.com/studio) with Meerkat version or latest version for Android development
- [Xcode](https://developer.apple.com/xcode) latest version for iOS and macOS development
- [Ruby](https://www.ruby-lang.org) >= 3.3.6 for iOS and macOS development. You can use [ruby-install](https://github.com/postmodern/ruby-install) to install other Ruby versions with [chruby](https://github.com/postmodern/chruby) to easily switch Ruby version

## Knowledges
To contribute to this project, we assummed that you know about app development with React Native including:
- **JavaScript** or **TypeScript** language as the library user bridge to consume native modules of platform
- **Java** or **Kotlin** for Android library development
- **Objective-C** for iOS and macOS library development. Optionally, you can use **Swift** language. The library currently does not contain any Swift code due to the Swift bridging header performance, but it's not prohibited to use
- [Turbo Native Modules](https://reactnative.dev/docs/turbo-native-modules-introduction) for React Native module development with new architecture. You can also refer to the [reactwg](https://github.com/reactwg/react-native-new-architecture) documentation for additional information about React Native New Architecture
- [Legacy Native Modules](https://reactnative.dev/docs/legacy/native-modules-intro) for React Native module development with old/legacy architecture
- A bit of [react-native-builder-bob](https://callstack.github.io/react-native-builder-bob) knowledges as the builder for React Native libraries for various targets

You don't have to know it all at advanced level. **Feel free to learn and embrace it**. Do the actual fix and any improvements. I encourage you.

## Clone
Clone this repository in your machine
```
git clone https://github.com/RakaDoank/ping-react-native.git
```

## Setup
Make your environment is ready and the repository has been cloned. After that, do these next steps

### 1. NPM Dependencies Installation
Go to the repository's directory in your terminal or cmd and do the installation with your `pnpm`
```
pnpm install
```

This installation will install all the npm registries including the `react-native` example app.

### 2. Library Installation with Example App
In this project, the example app at the `ping-react-native/example` directory is the app we will use as the library playground to use for the library development. The app was bootstrapped with [@react-native-community/cli](https://github.com/react-native-community/cli) with [some modificiations](#about-the-example-app-and-the-library-in-monorepo-setup).
To setup the React Native app and link the library (`ping-react-native`) itself are similar like the usual React Native CLI installation with autolinking of React Native libraries

#### Android
1. Open the `ping-react-native/example/android` directory with **Android Studio**
2. Sync project with gradle files
3. You should see `ping-react-native` in the sidebar explorer of Android Studio with `Android` mode directory. This is where the library code lives you can actually do any fixes

#### iOS
Beforehand, make sure you are with Ruby >= 3.3.6 version
1. Open your terminal
2. Go to the `ping-react-native/example/ios` directory
3. Install the pods
> bundle install && bundle exec pod install
4. Open the `ping-react-native/example/ios/example.xcworkspace` directory with **Xcode**
5. You should see `RNPing` folder in the `Pods > Development Tools` from the sidebar navigator. This is where the library code lives you can actually do any fixes

#### macOS
⚠️ The example app is not compatible with the macOS React Native app yet. Soon this documentation will be updated

## Run the Example App

### Android
For Android, you need to run with physical Android devices. See [Emulator Networking](https://developer.android.com/studio/run/emulator-networking#networkinglimitations). Please, connect your Android with USB (or you can connect it ADB Wireless Mode). run `adb devices` in your terminal or cmd, and make sure your devices are listed.

After that, you can run the app. Go the `example` directory, run `npm run android`. Alternatively, you can run the metro first by execute `npm run start`, and then run `npm run android` later.

### iOS
For iOS, you need run your iPhone/iPad Simulator first.

After it's completely booted up, you can run the app. Go the `example` directory, run `npm run ios`. Alternatively, you can run the metro first by execute `npm run start`, and then run `npm run ios` later.

## Conventions

### JavaScript/TypeScript
All the JavaScript/TypeScript has been lint-checked with ESLint, and type-checked with TypeScript. Please follow the rule that has been made e.g indentation with Tab. Do not modify the rule or add `// eslint-disable` mark to your code with no reasons.

While development, ensure that your ESLint Extension of your Visual Studio Code is running if you are using that IDE. Alternatively, you can run `npm run code-check` in the root of repository.

You can check the lint rules at [ping-react-native/eslint.config.mjs](https://github.com/RakaDoank/ping-react-native/blob/main/eslint.config.mjs) and the `compilerOptions` of TypeScript at [ping-react-native/tsconfig.json](https://github.com/RakaDoank/ping-react-native/blob/main/tsconfig.json) and other `tsconfig.json` files in the `example` and `package` directory.

### Java/Kotlin
The convention for the project for Java/Kotlin code is only indentatation with Tab

### Objective-C/Swift
Please, follow the [Google Objective-C Style Guide](https://google.github.io/styleguide/objcguide.html). It's a good one.

## Directories
- `.github`: You don't have to worry about this directory
- `builder-bob`: This directory is for the builder of React Native library with hard-coded path configuration to the `package` directory. You can read [this documentation](https://callstack.github.io/react-native-builder-bob/build)
- `example`: This is the actual of React Native app as the playground of the library development
- `package`: This is the actual `ping-react-native` library source code lives. This directory will be used as the actual `ping-react-native` library in the npm registry

## About the Example App and the Library in Monorepo Setup
The app was actually bootstrapped with [@react-native-community/cli](https://github.com/react-native-community/cli), but since this project is a monorepo setup with `PNPM` to scaffold both app and actual library deployment. There are modifications that have been done in the example app to split between the app, the actual `ping-react-native` library, and other development tools or the `devDependencies`
- `ping-react-native/example/android/app/build.gradle`: You see the `react` ext has configured and remapped where the `node_modules` directory actually lives instead of the default path
- `ping-react-native/example/android/settings.gradle`: Same as the `app/build.gradle`, the `node_modules` path has been remapped to the correct directory
- `ping-react-native/example/metro.config.js`: The example app has to know where the `node_modules` and the actual `ping-react-native` directory lives without including the `ping-react-native` in the `dependencies` of the `package.json` example app
- `ping-react-native/example/react-native.config.js`: Since the actual `ping-react-native` library is not included as `dependencies` in the `package.json` file of example app, we have to tell React Native CLI where the `ping-react-native` directory lives to auto-linked the example app with `ping-react-native` library in development
- `@react-native/eslint-config` development dependency (`devDependencies`) was moved out to the root of `package.json` (repository) from the `example` app
