export interface ICMPConstructorData {
	host: string,
	count?: number,
	/**
	 * in bytes
	 */
	packetSize?: number | null,
	/**
	 * in milliseconds
	 * @default 1000
	 */
	timeout?: number | null,
	ttl?: number | null,
	/**
	 * In milliseconds
	 * @default 1000
	 */
	interval?: number | null,
}
