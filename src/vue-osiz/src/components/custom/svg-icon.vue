<script setup lang="ts">
import {computed, useAttrs} from 'vue'
import {Icon} from '@iconify/vue'

defineOptions({
  name: 'SvgIcon',
  inheritAttrs: false
})

interface Props {
  icon?: string;
  localIcon?: string;
}

const props = defineProps<Props>()
const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || ''
}))

const symbolId = computed(() => {
  const defaultLocalIcon = 'no-icon'
  const icon = props.icon || defaultLocalIcon
  return `#local-icon-${icon}`
})

const renderLocalIcon = computed(() => props.localIcon || !props.icon)
</script>

<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor"/>
    </svg>
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs"/>
  </template>
</template>

<style scoped>

</style>