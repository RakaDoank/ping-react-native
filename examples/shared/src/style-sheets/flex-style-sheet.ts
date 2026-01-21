import {
	StyleSheet,
} from "react-native"

/**
 * Copied from "@audira/carbon-react-native"
 */
export const FlexStyleSheet = StyleSheet.create({
	flex_1: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	flex_auto: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: "auto",
	},
	flex_initial: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: "auto",
	},
	flex_col: {
		flexDirection: "column",
	},
	flex_col_reverse: {
		flexDirection: "column-reverse",
	},
	flex_row: {
		flexDirection: "row",
	},
	flex_row_reverse: {
		flexDirection: "row-reverse",
	},
	flex_wrap: {
		flexWrap: "wrap",
	},
	flex_wrap_reverse: {
		flexWrap: "wrap-reverse",
	},
	flex_nowrap: {
		flexWrap: "nowrap",
	},
	items_start: {
		alignItems: "flex-start",
	},
	items_center: {
		alignItems: "center",
	},
	items_end: {
		alignItems: "flex-end",
	},
	content_start: {
		alignContent: "flex-start",
	},
	content_center: {
		alignContent: "center",
	},
	content_end: {
		alignContent: "flex-end",
	},
	justify_start: {
		justifyContent: "flex-start",
	},
	justify_center: {
		justifyContent: "center",
	},
	justify_between: {
		justifyContent: "space-between",
	},
	justify_end: {
		justifyContent: "flex-end",
	},
	self_start: {
		alignSelf: "flex-start",
	},
	self_center: {
		alignSelf: "center",
	},
	self_end: {
		alignSelf: "flex-end",
	},
	self_stretch: {
		alignSelf: "stretch",
	},
})
