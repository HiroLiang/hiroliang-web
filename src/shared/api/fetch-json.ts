export async function fetchJson<TData>(url: string, init?: RequestInit): Promise<TData> {
  const response = await fetch(url, init)

  if (!response.ok) {
    throw new Error(`JSON request failed with status ${response.status}`)
  }

  return response.json() as Promise<TData>
}
