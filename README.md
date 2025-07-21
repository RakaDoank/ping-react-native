# ping-react-native

Expose the Internet Control Message Protocol (**ICMP**) to React Native app natively.  
Measure the round-trip time (RTT) by using ICMP echo request packets to the intended destination and iterate it in native side.

🚀 This library is supported in New Architecture (Turbo Modules)

- [Platforms](#platforms)
- [Requirements](#requirements)
- [Installation](#installation)
- [APIs](#apis)
    - [ICMP](#icmp)
    - [useICMP](#useICMP)
    - [isReachable()](#isreachable)
    - [getHostName()](#gethostname)
- [Definitions](#definitions)
    - [ICMPResult](#icmpresult)
    - [ICMPConstructorData](#icmpconstructordata)
    - [UseICMP](#useicmp-1)
    - [UseICMPProps](#useicmpprops)
    - [PingStatus](#pingstatus)
- [Android Emulator Limitations](#android-emulator-limitations)

## Platforms
| Platform | Compatible |  Remarks                                             |
| -------- | ---------- | ---------------------------------------------------- |
| Android  | ✅         |                                                     |
| iOS      | ✅         | Old architecture is not compatible yet              |
| Windows  | ❌         |
| macOS    | ❌         | Still in progress                                   |
| Web      | ❌         | There is no ICMP in the web                         |

## Requirements

This library requires explicit library and React Native version due to Turbo Modules capabilities and backward compatibility support

#### New Architecture
This library requires React Native >= 0.76 version. If you are using the latest React Native, you're good to go. Otherwise, either you need to upgrade your React Native version or you can [opt-out the new architecture](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here#opt-out) of your app and see the [Old Architecture](#old-architecture).
#### Old Architecture
> Currently, it's only for Android. Still in progress for iOS.

This library marked for React Native >= 0.76 as the `peerDependencies`, but actually you can use this library if you're in React Native >= 0.72 version. You need to override this library's peer dependency by adding `overrides` property of your `package.json`
```json
{
  "name": "yourapp",
  "private": true
  "dependencies": {
    "ping-react-native": "libraryVersion"
  },
  "overrides": {
    "react-native": ">=0.72"
  }
}
```
Cannot guarantee for older React Native versions support. It requires some tests.

## Installation
npm
```
npm install ping-react-native
```

or with Yarn
```
yarn add ping-react-native
```

## APIs
### ICMP
A bare JavaScript class to use ICMP controller of native module
```tsx
import { useRef } from 'react'
import { Button } from 'react-native'

import {
    ICMP,
    type ICMPResult,
} from 'ping-react-native'

export default function App(): React.JSX.Element {
    const
        icmp =
            useRef<ICMP | null>(
                new ICMP({ host: '1.1.1.1', packetSize: 64, timeout: 1000, count: 3 })
            ),

        [result, setResult] =
            useState<ICMPResult | null>(null)

    useEffect(() => {
        const icmpRef = icmp.current
        return () => {
            icmpRef?.stop()
        }
    }, [])

    const onPress = async () => {
        icmp.current?.ping(res => {
            setResult({
                rtt: result.rtt,
                ttl: result.ttl,
                status: result.status,
                isEnded: result.isEnded,
            })
        })
    }

    return (
        <Button
            title="Ping"
            onPress={ onPress } 
        />
    )
}
```
#### References
#### - Constructors: (data: [ICMPConstructorData](#icmpconstructordata))
| Data Properties | Type                              | Required  | Default Value | Remarks                                                                            |
| --------------- | --------------------------------- | --------- | ------------- | ---------------------------------------------------------------------------------- |
| **host**        | `string`                          | Yes       |               | valid host, e.g. 1.1.1.1 or guthib.com. Invalid host or unknown service will return ping result with `PingStatus.UNKNOWN_HOST` status                                                                                                                                                                              |
| **packetSize**  | `number` \| `null` \| `undefined` | No        | 56            | in bytes                                                                           |
| **timeout**     | `number` \| `null` \| `undefined` | No        | 1000          | in milliseconds                                                                    |
| **ttl**         | `number` \| `null` \| `undefined` | No        | 54            | [time-to-live](https://www.cloudflare.com/learning/cdn/glossary/time-to-live-ttl/) |
| **count**       | `number` \| `null` \| `undefined` | No        | 0             | amount of try to ping. 0 is infinite count. **Remember to stop the ping** before unmounting your component |
| **interval**    | `number` \| `null` \| `undefined` | No        | 1000          | in milliseconds

#### - Methods
| Method       | Return | Remarks                                                                                                               |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------- |
| **ping**     | `void` | Run the ICMP ping with arguments that has been defined from constructor. This method is an event listener that will invoke your callback function. If the method is invoked again while the previous process is still running, it will invoke your callback with `PingStatus.ECHOING` status.                                                                          |
| **stop**     | `void` | Stop current ICMP ping request. It's important to invoke this function to cleanup ICMP request to avoid memory leaks. It's safe to invoke this method even if there is no ping requests are running. |

#### - Properties
| Property            | Type                      |
| ------------------- | ------------------------- |
| **host**            | `readonly` `string`       |
| **packetSize**      | `readonly` `number`       |
| **timeout**         | `readonly` `number`       |
| **ttl**             | `readonly` `number`       |
| **count**           | `readonly` `number`       |
| **interval**        | `readonly` `number`       |

#### - Static Members
| Static Member       | Type              | Value             | Remarks                                                                                                     |
| ------------------- | ----------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **NO_ECHO_RTT**     | `number`          | -1                | Just an constant whenever the status of ping result is not `PingStatus.ECHO`. It is used in the rtt result. |
| **NO_ECHO_TTL**     | `number`          | -1                | Just an constant whenever the status of ping result is not `PingStatus.ECHO`. It is used in the ttl result. |

:warning::warning::warning: **Important!**

**IT'S NOT SAFE** to unmount your component without invoke the `stop` method if there are ICMP requests that still running. Your app may still has ICMP requests that still running in the background. Consider to use [useICMP](#useicmp) hook that do the cleanup automatically.

Do not iterate the `ping` method like with `setInterval` unless you really need it. The `count` argument is the iteration that has been done in native side.

# 
### useICMP
A React hook of encapsulated `ICMP` class that you may use it to simplify the cleanup handling
```tsx
import { Button } from 'react-native'

import {
    useICMP,
} from 'ping-react-native'

export default function App(): React.JSX.Element {
    const { isRunning, result, start, stop } = useICMP({
        host: 'guthib.com',
        packetSize: 64,
        timeout: 1000,
        interval: 1000,
        count: 10,
    })

    useEffect(() => {
        if(result) {
            console.log('Result: ', result.rtt, result.ttl, result.status)
        }
    }, [result])

    const toggle = () => {
        if(isRunning) {
            stop()
        } else {
            start()
        }
    }

    return (
        <Button
            title={ isRunning ? 'Stop' : 'Start' }
            onPress={ toggle }
        />
    )
}
```
You can see full example at [/example/src/screens/ping-runner/index.tsx](https://github.com/RakaDoank/ping-react-native/blob/main/example/src/screens/ping-runner/index.tsx)

It's safe to unmount your component without invoke the `stop` method. This hook will do the cleanup automatically.

#### References
#### - Returns: [UseICMP](#useicmp)
| Properties    | Type          | Remarks                                                                            |
| ------------- | ------------- | ---------------------------------------------------------------------------------- |
| **isRunning** | `boolean`     |
| **result**    | `ICMPResult`  | See [ICMPResult](#icmpresult)
| **start**     | `() => void`  |
| **stop**      | `() => void`  |
#
### isReachable
> ⚠️ Not ready. It's for future release.

`(host: string, timeout?: number) => Promise<boolean | null>`

Simple function to test whether that address is reachable. Android implementation attempts ICMP ECHO REQUESTs first, on failure it will fall back to TCP ECHO REQUESTs. Success on either protocol will return true.

The host argument can either be a machine name, such as "guthib.com", or a textual representation of its IP address.  
The timeout is 10000 (10 seconds) by default.
```tsx
import { Button } from 'react-native'

import {
    isReachable,
} from 'ping-react-native'

export default function App(): React.JSX.Element {
    const onPress = async () => {
        const isReached = await isReachable('guthib.com')
        console.log('Is reached: ', isReached)
    }

    return (
        <Button
            title="Test"
            onPress={ onPress }
        />
    )
}
```
#
### getHostName
> ⚠️ Not ready. It's for future release.

`(host: string) => Promise<string | null>`

If the host argument was given with a host name, this host name will be remembered and returned; otherwise, a reverse name lookup will be performed and the result will be returned based on the system configured name lookup service.
#

## Definitions
#### ICMPResult
| Properties    | Type                              | Remarks                                                                            |
| ------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| `rtt`         | `number`                          | When the `status` is not `PingStatus.ECHO`, the value will be -1 (`NO_ECHO_RTT`)
| `ttl`         | `number`                          | When the `status` is not `PingStatus.ECHO`, the value will be -1 (`NO_ECHO_TTL`)
| `status`      | `PingStatus`                      | Full references at [PingStatus](#pingstatus)
| `isEnded`     | `boolean`                         | `true` if there is a subsequent ping request coming.

#### ICMPConstructorData
| Properties    | Type                                | Remarks                                                                                                        |
| ------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `host`        | `string`                            | Can either be a machine name, such as "guthib.com", or a textual representation of its IP address.             |
| `packetSize`  | `number` \| `null` \| `undefined`   | Value in bytes. If it smaller than zero, the promise result will be returned with `PingStatus.INVALID_ARG` status.
| `ttl`         | `number` \| `null` \| `undefined`   | [time-to-live](https://www.cloudflare.com/learning/cdn/glossary/time-to-live-ttl/)
| `timeout`     | `number` \| `null` \| `undefined`   | Value in milliseconds.
| `count`       | `number` \| `null` \| `undefined`   | Amount of try to ping. 0 is infinite count
| `interval`    | `number` \| `null` \| `undefined`   | Value in milliseconds.

#### UseICMP
| Properties    | Type                                          | Remarks                                                                                                        |
| ------------- | -----------------------------------  | -------------------------------------------------------------------------------------------------------------- |
| `isRunning`   | `boolean`                            | A React state                                                                                                  |
| `result`      | `ICMPResult` \| `undefined`          | See [ICMPResult](#icmpresult)
| `start`       | `() => void`                         | See [UseICMPStartParams](#useicmpstartparams)
| `stop`        | `() => void`                         | Stop the current running process. It does nothing when there is no processes.

#### UseICMPProps
It extends [ICMPConstructorData](#icmpconstructordata).

#### PingStatus
| Member                         | Value          | Remarks                                                                              |
| ------------------------------ | -------------- | ------------------------------------------------------------------------------------ |
| `ECHO`                         | `2`            | Success
| `ECHOING`                      | `1`            | When the `ping` method or `start` is invoked when the previous process still running
| `TIMEDOUT`                     | `0`            |
| `INVALID_ARG`                  | `-1`           | Invalid argument. such as illegal packet size, ttl out of range.
| `UNKNOWN_HOST`                 | `-2`           |
| `UNKNOWN_FAILURE`              | `-3`           |
#

## Android Emulator Limitations
Depending on the environment, the emulator might not be able to support other protocols (such as ICMP, used for "ping"). See [Local networking limitations](https://developer.android.com/studio/run/emulator-networking#networkinglimitations).

Instead, you can use Android physical device and run React Native app in it.
