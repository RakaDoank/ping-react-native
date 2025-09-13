package com.audira.lib.reactnative.pingandroid.icmp

import com.facebook.react.bridge.ReadableMap
import kotlinx.coroutines.cancel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.delay
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.launch
import kotlinx.coroutines.TimeoutCancellationException
import kotlinx.coroutines.withTimeout
import java.io.BufferedReader
import java.io.InputStreamReader

private const val STR_END = "END"
private const val STR_ERR = "ERR"

class ICMP(
	host: String,

	/**
	 * in bytes
	 */
	packetSize: Int = 56,

	/**
	 * in milliseconds
	 */
	private val timeout: Long = 1000,

	ttl: Int = 54,

	/**
	 * Less than 0 will run forever?
	 */
	private val count: Long,

	private val interval: Long,

	private val onPing: (result: ICMPResult) -> Unit,
) {

	private var coroutineScope: CoroutineScope? = null
	private val processBuilder = ProcessBuilder(
		"/system/bin/ping",
		"-s", "$packetSize",
		"-c", "1",
		"-w", "${(timeout / 1000).let { if(it < 1) 1 else it }}",
		"-t", "$ttl",
		host,
	)
	private var process: Process? = null
	private var attempt: Long = 0
	private var isEnded: Boolean = false

	private fun pingExecute(): Flow<ReadableMap> {
		return callbackFlow {
			val log = StringBuilder()
			process = processBuilder.start()

			try {
				val reader = BufferedReader(
					InputStreamReader(process!!.inputStream)
				)
				val readerErr = BufferedReader(
					InputStreamReader(process!!.errorStream)
				)
				while(
					!reader.readLine().also {
						if(!it.isNullOrBlank()) {
							log.append("$it\n")
						}
					}.isNullOrBlank()
				) {
					// nothing
				}
				while(
					!readerErr.readLine().also {
						if(!it.isNullOrBlank()) {
							log.append("$STR_ERR $it\n")
						}
					}.isNullOrBlank()
				) {
					// nothing
				}
			} finally {
				process?.destroy()
				log.append(STR_END)

				if(log.slice(STR_END.indices) == STR_END) {
					// the string are only `END`
					trySend(
						createResultUnknownFailure(isEnded)
					)
				} else if(log.slice(STR_ERR.indices) == STR_ERR) {
					// the string started with `ERR` (Error Stream)
					trySend(
						createResultFromErrorLine(
							log.toString(),
							isEnded,
						)
					)
				} else {
					trySend(
						createResultFromLine(
							log.toString(),
							isEnded,
						)
					)
				}
			}

			awaitClose {
				process?.destroy()
			}
		}
			.flowOn(Dispatchers.IO)
	}

	fun ping() {
		if(count < 0 || timeout <= 0) {
			onPing(
				createResultInvalidArg()
			)
		} else {
			coroutineScope = CoroutineScope(Dispatchers.Main)
			coroutineScope?.launch {
				var millis: Long

				while(!isEnded) {
					millis = System.currentTimeMillis()
					attempt++
					isEnded = count > 0 && attempt == count

					try {
						withTimeout(timeout) {
							pingExecute().first {
								onPing(it)
								true
							}
						}
					} catch(e: TimeoutCancellationException) {
						onPing(
							createResultTimedOut(isEnded)
						)
					}

					if(isEnded) {
						coroutineScope?.cancel()
						coroutineScope = null
					}

					delay(interval - (System.currentTimeMillis() - millis))
				}
			}
		}
	}

	fun stop() {
		coroutineScope?.cancel()
		coroutineScope = null
	}

}