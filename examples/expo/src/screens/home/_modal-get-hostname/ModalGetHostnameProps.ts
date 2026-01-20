import type {
	ModalProps,
} from "@audira/carbon-react-native"

export interface ModalGetHostnameProps extends Omit<ModalProps, "children" | "title"> {
	dismissHandler: () => void,
}
