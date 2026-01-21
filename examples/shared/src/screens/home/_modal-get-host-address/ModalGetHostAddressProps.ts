import type {
	ModalProps,
} from "@audira/carbon-react-native"

export interface ModalGetHostAddressProps extends Omit<ModalProps, "children" | "title"> {
	dismissHandler: () => void,
}
