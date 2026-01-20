import type {
	ICMPConstructorData,
} from "ping-react-native"

export interface PageProps {
	onSubmit: (
		data: Required<ICMPConstructorData>,
	) => void,
}
