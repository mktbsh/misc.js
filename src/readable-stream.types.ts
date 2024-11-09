export type StreamResource<T> = T extends Blob
	? Uint8Array
	: T extends Uint8Array | ArrayBuffer
		? Uint8Array
		: T extends undefined | null | symbol
			? never
			: T;
