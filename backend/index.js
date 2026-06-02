require('dotenv').config()
const express = require('express')
const cors = require('cors')
const summarizeRoute = require('./routes/summarize')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/feedback', summarizeRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`FeedbackIQ server running on port ${PORT}`))