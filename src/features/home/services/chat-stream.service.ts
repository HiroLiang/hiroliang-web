import { readServerSentEvents } from '@/shared/api/server-sent-events'
import { appEnv, requireEnvValue } from '@/shared/config/env'

export type ChatStreamRq = {
  message: string
  model: string
  sessionId: string
}

type ChatStreamDelta = {
  content?: string
  role?: string
}

type ChatStreamChoice = {
  delta?: ChatStreamDelta
  finish_reason?: string | null
  index: number
}

export type ChatStreamRs = {
  choices?: ChatStreamChoice[]
  created?: number
  id?: string
  model?: string
  object?: string
  system_fingerprint?: string
}

type ChatStreamErrorRs = {
  error?: string
}

function getChatStreamConfig() {
  return {
    apiKey: requireEnvValue(appEnv.chatApiKey, 'VITE_CHAT_API_KEY'),
    model: requireEnvValue(appEnv.chatModel, 'VITE_CHAT_MODEL'),
    url: requireEnvValue(appEnv.chatStreamUrl, 'VITE_CHAT_STREAM_URL'),
  }
}

export function createChatStreamRequest(message: string, sessionId: string): ChatStreamRq {
  const { model } = getChatStreamConfig()

  return {
    message,
    model,
    sessionId,
  }
}

async function buildError(response: Response) {
  const bodyText = await response.text()

  if (!bodyText) {
    return new Error(`Chat stream request failed with status ${response.status}`)
  }

  try {
    const payload = JSON.parse(bodyText) as ChatStreamErrorRs
    if (payload.error) {
      return new Error(payload.error)
    }
  } catch {
    return new Error(bodyText)
  }

  return new Error(`Chat stream request failed with status ${response.status}`)
}

function parseStreamPayload(data: string) {
  if (data === '[DONE]') {
    return { done: true as const }
  }

  const payload = JSON.parse(data) as ChatStreamRs & ChatStreamErrorRs

  if (payload.error) {
    throw new Error(payload.error)
  }

  return {
    chunk: payload,
    done: false as const,
  }
}

function extractChunkContent(payload: ChatStreamRs) {
  return payload.choices?.map((choice) => choice.delta?.content ?? '').join('') ?? ''
}

export async function* streamChatReply(payload: ChatStreamRq): AsyncGenerator<string, void, void> {
  const { apiKey, url } = getChatStreamConfig()
  const requestUrl = new URL(url, window.location.origin)
  let fullReply = ''

  requestUrl.searchParams.set('message', payload.message)
  requestUrl.searchParams.set('session_id', payload.sessionId)
  requestUrl.searchParams.set('model', payload.model)

  const response = await fetch(requestUrl.toString(), {
    headers: {
      'X-Chat-Api-Key': apiKey,
    },
    method: 'GET',
  })

  if (!response.ok) {
    throw await buildError(response)
  }

  for await (const data of readServerSentEvents(response)) {
    const parsed = parseStreamPayload(data)

    if (parsed.done) {
      return
    }

    const nextContent = extractChunkContent(parsed.chunk)
    if (nextContent) {
      fullReply += nextContent
      yield fullReply
    }
  }
}
