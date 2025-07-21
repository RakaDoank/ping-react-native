import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

import {
	Pressable,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	VirtualizedList,
	type VirtualizedListProps,
} from 'react-native'

import {
	useSafeAreaInsets,
} from 'react-native-safe-area-context'

import {
	ICMP,
	PingStatus,
	useICMP,
} from 'ping-react-native'

import {
	type NavigationType,
} from '@/types'

import type {
	DataState,
} from './_DataState'

import type {
	ItemRendererData,
} from './_ItemRendererData'

export function PingRunnerScreen({
	route,
}: NavigationType.ScreenProps<'ping_runner'>) {

	const
		safeAreaInsets =
			useSafeAreaInsets(),

		ref =
			useRef<{
				initialRun: boolean,
				isRunning: boolean,
				virtualizedList: VirtualizedList<ItemRendererData> | null,
			}>({
				initialRun: false,
				isRunning: false,
				virtualizedList: null,
			}),

		[data, setData] =
			useState<DataState[]>([]),

		{ isRunning, result, start, stop } =
			useICMP({
				host: route.params.host,
				count: route.params.count,
				packetSize: route.params.packetSize,
				timeout: route.params.timeout,
				ttl: route.params.ttl,
			}),

		setVirtualizedListRef: React.RefCallback<VirtualizedList<ItemRendererData>> =
			useCallback(_ref => {
				ref.current.virtualizedList = _ref
			}, []),

		startHandler =
			useCallback(() => {
				console.log('startHandler: ', route.params)
				start()
			}, [
				start,
				route.params,
			])

	useEffect(() => {
		/**
		 * Cannot depends on the falsy of `isRunning` since it will be re-invoked the `startHandler` again when isRunning == false
		 */
		// if(!isRunning) {}

		if(!ref.current.initialRun) {
			console.log('initialRun')
			ref.current.initialRun = true
			startHandler()
		}
	}, [
		startHandler,
	])

	useEffect(() => {
		ref.current.isRunning = isRunning
	}, [
		isRunning,
	])

	useEffect(() => {
		if(result) {
			setData(_data => _data.concat({ ...result }))
		}
	}, [
		result,
	])

	const onContentSizeChange = useCallback(() => {
		ref.current.virtualizedList?.scrollToEnd({
			animated: true,
		})
	}, [])

	const toggleHandler = useCallback(() => {
		if(isRunning) {
			stop()
		} else {
			startHandler()
		}
	}, [
		isRunning,
		stop,
		startHandler,
	])

	const itemGetter: NonNullable<NonNullable<VirtualizedListProps<ItemRendererData>>['getItem']>
		= useCallback((_data, index) => {
			return {
				host: route.params.host,
				...data[index]!,
			}
		}, [
			data,
			route.params,
		])

	const keyExtractorHandler: NonNullable<NonNullable<VirtualizedListProps<ItemRendererData>>['keyExtractor']>
		= useCallback((_item, index) => {
			return index.toString() // it's safe just to use the index as key
		}, [])

	return (
		<View
			style={ [
				Styles.page,
				{
					paddingTop: safeAreaInsets.top,
					paddingBottom: safeAreaInsets.bottom,
				},
			] }
		>
			<View
				style={ Styles.hug }
			>
				<VirtualizedList
					data={ data }
					getItem={ itemGetter }
					getItemCount={ () => data.length }
					keyExtractor={ keyExtractorHandler }
					renderItem={ itemRenderer }
					onContentSizeChange={ onContentSizeChange }
					ref={ setVirtualizedListRef }
				/>

				<Pressable style={ Styles.button }
					onPress={ toggleHandler }
				>
					<Text style={ Styles.buttonText }>
						{ isRunning ? 'Stop' : 'Start' }
					</Text>
				</Pressable>
			</View>
		</View>
	)

}

const Styles = StyleSheet.create({
	page: {
		padding: 16,
		flex: 1,
	},
	hug: {
		flex: 1,
		width: '100%',
		maxWidth: 480,
		alignSelf: 'center',
		justifyContent: 'space-between',
	},
	button: {
		marginTop: 8,
		padding: 4,
		backgroundColor: 'blue',
		borderRadius: 4,
		overflow: 'hidden',
		alignSelf: 'stretch',
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 24,
		color: 'white',
		fontWeight: '600',
		textAlign: 'center',
	},

	item: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: 'auto',
		flexDirection: 'row',
		width: '100%',
	},
	itemCol: {
		flex: 1,
	},
	itemText: {
		fontSize: 14,
		lineHeight: 20,
	},
	itemTextLight: {
		color: '#EEEEEE',
	},
	itemTextDark: {
		color: '#111111',
	},
	itemTextAlignRight: {
		textAlign: 'right',
	},
	mr2: {
		marginRight: 8,
	},
})

const itemRenderer: NonNullable<VirtualizedListProps<ItemRendererData>>['renderItem']
	= itemProps => {

		return (
			<Item
				{ ...itemProps.item }
			/>
		)

	}

interface ItemPropsInterface extends ItemRendererData {
}
function Item({
	host,
	rtt,
	status,
}: ItemPropsInterface) {

	const
		colorScheme =
			useColorScheme(),

		textStyle =
			colorScheme === 'dark'
				? Styles.itemTextLight
				: Styles.itemTextDark

	return (
		<View
			style={ Styles.item }
		>
			<View style={ [Styles.itemCol, Styles.mr2] }>
				<Text style={ [Styles.itemText, textStyle] }>
					{ host }
				</Text>
			</View>
			<View style={ Styles.itemCol }>
				<Text style={ [Styles.itemText, textStyle, Styles.itemTextAlignRight] }>
					{ rtt > ICMP.NO_ECHO_RTT ? rtt : mapStatusToText[status] }
				</Text>
			</View>
		</View>
	)

}

const mapStatusToText: Record<string, string> = {
	[PingStatus.TIMEDOUT]: 'Timed Out',
	[PingStatus.INVALID_ARG]: 'Invalid',
	[PingStatus.UNKNOWN_FAILURE]: 'Unknown Failure',
	[PingStatus.UNKNOWN_HOST]: 'Unknown Host',
}
