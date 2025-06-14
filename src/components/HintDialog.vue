<template>
    <div v-if="visible" class="hint-overlay">
      <div class="hint-dialog">
        <p>{{ hint }}</p>
        <button @click="$emit('close')">Затвори</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ visible: Boolean, hint: String });
  </script>
  
  <style scoped>
  .hint-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hint-dialog {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  