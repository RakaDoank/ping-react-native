import type {
	ICMPConstructorData,
} from "ping-react-native"

export interface PageProps extends ICMPConstructorData {
	backHandler: () => void,
}
