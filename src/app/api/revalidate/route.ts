import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      })
    }

    if (!body?._type) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    // Revalidate tags based on document type
    // @ts-expect-error - next 15 types
    revalidateTag(body._type)
    
    // Also revalidate global tags if needed
    if (body._type === 'siteSettings' || body._type === 'navigation') {
      // @ts-expect-error - next 15 types
      revalidateTag('global')
    }

    return NextResponse.json({ body })
  } catch (err: unknown) {
    console.error(err)
    const message = err instanceof Error ? err.message : String(err)
    return new Response(message, { status: 500 })
  }
}
