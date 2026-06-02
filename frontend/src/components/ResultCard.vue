<template>
  <div class="card">
    <div class="card-header">
      <h2>Analysis Result</h2>
    </div>

    <div class="score-row">
      <div class="score-block">
        <span class="label">Sentiment</span>
        <span class="sentiment" :class="sentimentClass">{{ result.sentiment }}</span>
      </div>
      <div class="score-block">
        <span class="label">Satisfaction Score</span>
        <span class="score">{{ result.score }} <span class="score-max">/ 10</span></span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="label">Summary</p>
      <p class="summary">{{ result.summary }}</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <p class="label">Key Themes</p>
      <div class="themes">
        <span class="theme" v-for="(t, i) in result.key_themes" :key="i">{{ t }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ result: Object })

const sentimentClass = computed(() => {
  const s = props.result?.sentiment?.toLowerCase()
  if (s === 'positive') return 'positive'
  if (s === 'negative') return 'negative'
  return 'mixed'
})
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 1.5rem;
  animation: rise 0.3s ease;
}

@keyframes rise {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header { margin-bottom: 1.25rem; }
.card-header h2 { font-size: 15px; font-weight: 500; color: #1a1a1a; }

.score-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.25rem;
}

.score-block { display: flex; flex-direction: column; gap: 4px; }

.label {
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 400;
  margin-bottom: 6px;
}

.sentiment {
  font-size: 14px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

.positive { background: #f0fdf4; color: #16a34a; }
.negative { background: #fff5f5; color: #dc2626; }
.mixed    { background: #fffbeb; color: #d97706; }

.score {
  font-size: 24px;
  font-weight: 500;
  color: #1a1a1a;
}

.score-max { font-size: 14px; color: #ccc; font-weight: 300; }

.divider { border: none; border-top: 1px solid #f0f0f0; margin: 1.25rem 0; }

.section { display: flex; flex-direction: column; }

.summary { font-size: 14px; color: #444; line-height: 1.7; font-weight: 300; }

.themes { display: flex; flex-wrap: wrap; gap: 8px; }

.theme {
  background: #f4f4f4;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: #444;
}
</style>