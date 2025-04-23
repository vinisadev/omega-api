import { NextRequest, NextResponse } from 'next/server'

interface DateRequest {
  dates: string[]
}

interface DateObject {
  formattedDate: string
}

interface DateResponse {
  formattedDates: DateObject[]
}

export async function POST(request: NextRequest) {
  // Parse the request body
  const req: DateRequest = await request.json()

  if (!req.dates || !Array.isArray(req.dates)) {
    return NextResponse.json(
      { message: 'Invalid request payload' },
      { status: 400 }
    )
  }

  const formattedDates: DateObject[] = []

  for (const dateStr of req.dates) {
    const [year, month, day] = dateStr.split('-').map(Number)

    const parsedDate = new Date(year, month - 1, day)

    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: 'Invalid date format' },
        { status: 400 }
      )
    }

    const formattedDate = parsedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    formattedDates.push({ formattedDate })
  }

  const response: DateResponse = { formattedDates }
  return NextResponse.json(response)
}