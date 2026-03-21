import { request } from '@/lib/axios'

export type ChatRequest = {
  message: string
}

export type ChatResponse = {
  content?: string
  message?: string
  reply?: string
}

const STREAMING_DELAY_MS = 16

function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function extractReply(response: ChatResponse) {
  return response.content ?? response.message ?? response.reply ?? ''
}

export async function* streamChatReply(payload: ChatRequest): AsyncGenerator<string, void, void> {
  const response = await request<ChatResponse, ChatRequest>({
    data: payload,
    method: 'POST',
    url: '/chat',
  })

  const reply = extractReply(response)

  if (!reply) {
    return
  }

  for (let index = 1; index <= reply.length; index += 1) {
    yield reply.slice(0, index)
    await sleep(STREAMING_DELAY_MS)
  }
}
