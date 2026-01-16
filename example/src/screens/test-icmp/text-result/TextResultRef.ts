import type {
	ICMPResult,
} from "ping-react-native"

export interface TextResultRef {
	setResult: (result: ICMPResult) => void,
}
