<script setup lang="ts">
import SimpleBar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

defineOptions({
  name: 'SimpleScrollbar'
});
</script>

<template>
  <div class="h-full flex-1-hidden">
    <SimpleBar class="h-full">
      <slot />
    </SimpleBar>
  </div>
</template>

<style scoped></style>
