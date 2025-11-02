# Migrating V1 to V2

In the 2.x version, there is no changes at native side of this library at all actually, but there is a breaking change in the JS side.

## Breaking Change

### useICMP
In the 2.x version, the `start` and the `stop` method from the hook has been removed. In favor of keeping the functionality of when should the ICMP instance run, you can provide `enabled` boolean option to the hook. It takes you to the declarative approach (defining dependencies when your ICMP should run)

```tsx
import {
  useICMP,
} from 'ping-react-native'

export default function App(): React.JSX.Element {
  const
    // You can control when the ICMP should run declaratively
    // You may not need if it's always true because the `enabled` from the `useICMP` props is true by default
    [enabled, setEnabled] =
      useState(true),

    { isRunning, result } =
      useICMP({
        host: 'guthib.com',
        packetSize: 64,
        timeout: 1000,
        interval: 1000,
        count: 10,
        enabled,
      })

  useEffect(() => {
      if(result) {
          console.log('Result: ', result.rtt, result.ttl, result.status)
      }
  }, [result])
}
```

Keep it mind, the `isRunning` will still give you `false` value if the ICMP completes its iteration or there is no running ICMP instance even if the `enabled` is true.

## Deprecating

### PingStatus
TL;DR You can use the `ICMPStatus` instead, but it's still safe to use the `PingStatus`. 

The `PingStatus` has been annotated as deprecated because i don't know it's correct implementation to make it common in some way if this library is providing another protocol, like UDP.

## Internal

### ESLint
This project is linted with the [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) v7 to improve the React Hooks usage including improvement of the `useICMP` (that's why the `start` and the `stop` method has been removed in some reasons).

### Trusted Publishing
This project is not using npm token anymore to publish the [ping-react-native](https://npmjs.com/package/ping-react-native) package. Instead, publish the package to the npm registry securely and directly from CI/CD workflow using OpenID Connnect (OIDC) for authentication.
