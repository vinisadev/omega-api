import { NextRequest, NextResponse } from 'next/server'

interface ConvertToEpochRequest {
  todaysDateUTC: string
  forwardDays: number
}

interface ConvertToEpochResponse {
  todaysDateUTC: string
  startDateEpoch: number
  endDate: string
  endDateEpoch: number
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { todaysDateUTC, forwardDays }: ConvertToEpochRequest = await request.json()

    if (!todaysDateUTC || typeof forwardDays !== 'number') {
      return NextResponse.json(
        {
          error: 'Invalid input. Provide todaysDateUTC (string) and forwardDays (number).'
        },
        { status: 400 }
      )
    }

    const startDate = new Date(todaysDateUTC)
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        {
          error: 'Invalid date format. Please provide a valid date string.'
        },
        { status: 400 }
      )
    }

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + forwardDays)

    const startDateEpoch = startDate.getTime()
    const endDateEpoch = endDate.getTime()

    const response: ConvertToEpochResponse = {
      todaysDateUTC,
      startDateEpoch,
      endDate: endDate.toISOString(),
      endDateEpoch
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}