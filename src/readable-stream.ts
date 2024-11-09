import type { StreamResource } from "./readable-stream.types";

export function toReadableStream<T>(
	value: T,
): ReadableStream<StreamResource<T>> {
	if (value === undefined || value === null || typeof value === "symbol") {
		throw new TypeError(
			"Cannot convert undefined, null, or symbol to ReadableStream",
		);
	}

	if (value instanceof Blob) {
		return value.stream() as ReadableStream<StreamResource<T>>;
	}

	if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
		const uint8Array = new Uint8Array(value);
		return new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(uint8Array);
				controller.close();
			},
		}) as ReadableStream<StreamResource<T>>;
	}

	return new ReadableStream<StreamResource<T>>({
		start(controller) {
			controller.enqueue(value as StreamResource<T>);
			controller.close();
		},
	});
}
