export async function streamToU8A(
  stream: AsyncIterable<{ chunk: Uint8Array }>,
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  for await (const { chunk } of stream) {
    chunks.push(chunk);
  }

  const total = chunks.reduce(
    (sum: number, arr: Uint8Array<ArrayBufferLike>) => sum + arr.length,
    0,
  );

  const res = new Uint8Array(total);
  let offset = 0;

  for (const arr of chunks) {
    res.set(arr, offset);
    offset += arr.length;
  }

  return res;
}
