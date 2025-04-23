import express, { Request, Response } from 'express'
import cors from 'cors'

interface DateRequest {
  dates: string[]
}

interface DateObject {
  formattedDate: string
}

interface DateResponse {
  formattedDates: DateObject[]
}

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Omega API')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
