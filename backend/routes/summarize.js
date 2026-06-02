const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/analyze', async (req, res) => {
  const { feedbacks } = req.body

  if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) {
    return res.status(400).json({ error: 'Please provide at least one feedback.' })
  }

  const numbered = feedbacks.map((f, i) => `${i + 1}. ${f}`).join('\n')

  const prompt = `You are a product analyst. A user has submitted the following customer feedbacks for analysis.

Feedbacks:
${numbered}

Return a JSON response with this exact structure and no extra text:
{
  "summary": "2-3 sentence overview of the overall feedback",
  "sentiment": "Positive or Negative or Mixed",
  "score": <a number from 1 to 10 representing overall satisfaction>,
  "key_themes": ["theme one", "theme two", "theme three"]
}`

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    })

    const raw = completion.choices[0].message.content
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    res.json({ success: true, data: parsed })
  } catch (err) {
    console.error('Analysis error:', err)
    res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
})

module.exports = router