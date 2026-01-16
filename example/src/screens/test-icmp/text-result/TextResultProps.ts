import type {
	ViewProps,
} from "react-native"

import type {
	TextResultRef,
} from "./TextResultRef"

export interface TextResultProps extends Omit<ViewProps, "children" | "ref"> {
	limit: number,
	ref?: React.Ref<TextResultRef>,
}
