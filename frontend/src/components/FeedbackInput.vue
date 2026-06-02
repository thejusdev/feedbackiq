<template>
  <div class="card">
    <div class="card-header">
      <h2>Customer Feedbacks</h2>
      <p>Add one feedback per field. Minimum 1, maximum 10.</p>
    </div>

    <div class="fields">
      <div class="field-row" v-for="(fb, i) in feedbacks" :key="i">
        <textarea
          class="field"
          :placeholder="`Feedback ${i + 1}...`"
          v-model="feedbacks[i]"
          rows="1"
          @input="autoResize($event)"
        ></textarea>
        <button class="remove" @click="remove(i)" v-if="feedbacks.length > 1" title="Remove">
          ✕
        </button>
      </div>
    </div>

    <div class="actions">
      <button class="btn-ghost" @click="add" :disabled="feedbacks.length >= 10">
        + Add feedback
      </button>
      <button class="btn-primary" @click="$emit('submit', feedbacks)" :disabled="!hasInput || loading">
        {{ loading ? 'Analyzing...' : 'Analyze' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({ loading: Boolean })
defineEmits(['submit'])

const feedbacks = ref(['', ''])

const hasInput = computed(() => feedbacks.value.some(f => f.trim().length > 0))

function add() { if (feedbacks.value.length < 10) feedbacks.value.push('') }
function remove(i) { feedbacks.value.splice(i, 1) }
function autoResize(e) {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 1.5rem;
}

.card-header { margin-bottom: 1.25rem; }

.card-header h2 {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.card-header p { font-size: 13px; color: #999; font-weight: 300; }

.fields { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.25rem; }

.field-row { display: flex; gap: 8px; align-items: flex-start; }

.field {
  flex: 1;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 14px;
  color: #1a1a1a;
  resize: none;
  outline: none;
  background: #fafafa;
  transition: border-color 0.15s;
  min-height: 40px;
}

.field:focus { border-color: #1a1a1a; background: #fff; }
.field::placeholder { color: #ccc; }

.remove {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
  margin-top: 10px;
  transition: color 0.15s;
}
.remove:hover { color: #999; }

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.btn-ghost {
  background: none;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 9px 16px;
  font-family: inherit;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-ghost:hover:not(:disabled) { border-color: #ccc; color: #1a1a1a; }
.btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-primary {
  background: #1a1a1a;
  border: none;
  border-radius: 8px;
  padding: 9px 24px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-primary:hover:not(:disabled) { opacity: 0.8; }
.btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }
</style>