function decodeStreamChunk(decoder: TextDecoder, value: Uint8Array | undefined, done: boolean) {
  return decoder.decode(value ?? new Uint8Array(), { stream: !done })
}

function parseDataLine(line: string) {
  if (!line.startsWith('data:')) {
    throw new Error('Invalid SSE payload received from stream API')
  }

  return line.slice(5).trim()
}

export async function* readServerSentEvents(response: Response): AsyncGenerator<string, void, void> {
  if (!response.body) {
    throw new Error('Stream response body is empty')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let hasReceivedStreamData = false

  // 繁中：SSE 會被切成任意 chunk，必須先累積到換行再解析。
  // English: SSE chunks can split anywhere, so parsing waits for line boundaries.
  // 日本語：SSE は任意の位置で分割されるため、改行単位まで蓄積してから解析します。
  while (true) {
    const { done, value } = await reader.read()
    buffer += decodeStreamChunk(decoder, value, done)

    let newlineIndex = buffer.indexOf('\n')

    while (newlineIndex >= 0) {
      const line = buffer.slice(0, newlineIndex).replace(/\r$/, '')
      buffer = buffer.slice(newlineIndex + 1)

      if (line) {
        hasReceivedStreamData = true
        yield parseDataLine(line)
      }

      newlineIndex = buffer.indexOf('\n')
    }

    if (done) {
      break
    }
  }

  if (buffer.trim()) {
    hasReceivedStreamData = true
    yield parseDataLine(buffer.trim())
  }

  if (!hasReceivedStreamData) {
    throw new Error('Stream API did not return SSE data')
  }
}
