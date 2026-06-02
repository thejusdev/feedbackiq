<template>
  <div class="page">
    <header class="header">
      <div class="logo">
        <span class="logo-mark">IQ</span>
        <span class="logo-text">FeedbackIQ</span>
      </div>
      <p class="tagline">Analyze customer feedback instantly with AI</p>
    </header>

    <main class="main">
      <FeedbackInput :loading="loading" @submit="handleSubmit" />
      <div class="error" v-if="error">{{ error }}</div>
      <ResultCard v-if="result" :result="result" />
    </main>

    <footer class="footer">Node.js · Groq · Vue</footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import FeedbackInput from './components/FeedbackInput.vue'
import ResultCard from './components/ResultCard.vue'

const loading = ref(false)
const result = ref(null)
const error = ref(null)

async function handleSubmit(feedbacks) {
  const filtered = feedbacks.filter(f => f.trim())
  if (!filtered.length) return

  loading.value = true
  result.value = null
  error.value = null

  try {
    const res = await axios.post('http://localhost:3000/api/feedback/analyze', {
      feedbacks: filtered
    })
    result.value = res.data.data
  } catch (err) {
    error.value = err.response?.data?.error || 'Could not reach server. Is your backend running?'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.header {
  margin-bottom: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.logo-mark {
  background: #1a1a1a;
  color: #f9f9f8;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.logo-text {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

.tagline {
  font-size: 14px;
  color: #888;
  font-weight: 300;
}

.main { display: flex; flex-direction: column; gap: 2rem; }

.error {
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 12px 16px;
  color: #dc2626;
  font-size: 14px;
}

.footer {
  margin-top: 4rem;
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
</style>