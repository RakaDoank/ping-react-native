import type {
	ICMPConstructorData,
} from "ping-react-native"

export interface PageProps {
	backHandler: () => void,
	onSubmit: (
		data: Required<ICMPConstructorData>,
	) => void,
}
