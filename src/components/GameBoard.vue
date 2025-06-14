<template>
  <span class="tooltip" :title="text">
    <slot />
  </span>
</template>

<script setup>
defineProps({ text: String });
</script>

<style scoped>
.tooltip {
  cursor: help;
  border-bottom: 1px dotted #666;
}
</style>