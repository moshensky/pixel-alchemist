import type { z } from 'zod'

export function parseApiResponse<T>(
  schema: z.ZodType<T>,
  response: unknown,
): T {
  const parseResult = schema.safeParse(response)
  if (!parseResult.success) {
    throw new Error(
      `Invalid API response: ${JSON.stringify(parseResult.error)}`,
    )
  }

  return parseResult.data
}
