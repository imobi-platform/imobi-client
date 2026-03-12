<template>
    <div ref="trackRef" class="tabs">
        <div class="tabs-indicator" :style="indicatorStyle" />
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { default: null },
})

const emit = defineEmits(['update:modelValue'])

const trackRef = ref(null)
const tabElements = ref({})
const indicatorStyle = ref({ left: '0px', width: '0px' })

const PADDING = 2

function registerTab(id, el) {
    if (el) tabElements.value[id] = el
    nextTick(updateIndicator)
}

function unregisterTab(id) {
    delete tabElements.value[id]
    nextTick(updateIndicator)
}

function updateIndicator() {
    const el = tabElements.value[props.modelValue]
    const track = trackRef.value
    if (el && track) {
        const trackRect = track.getBoundingClientRect()
        const tabRect = el.getBoundingClientRect()
        indicatorStyle.value = {
            left: `${tabRect.left - trackRect.left + track.scrollLeft}px`,
            width: `${tabRect.width}px`,
        }
    }
}

function setActiveTab(id) {
    emit('update:modelValue', id)
}

watch(() => props.modelValue, updateIndicator)
onMounted(() => {
    nextTick(updateIndicator)
    if (typeof window !== 'undefined') window.addEventListener('resize', updateIndicator)
})
onBeforeUnmount(() => {
    if (typeof window !== 'undefined') window.removeEventListener('resize', updateIndicator)
})

provide('tabs', {
    activeTabId: computed(() => props.modelValue),
    setActiveTab,
    registerTab,
    unregisterTab,
    padding: PADDING,
})
</script>

<style scoped>
.tabs {
    position: relative;
    display: inline-flex;
    align-items: center;
    background: #f4f7fa;
    border-radius: 9999px;
    padding: 2px;
    margin-bottom: 1.5rem;
}

.tabs-indicator {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    background: #fff;
    border-radius: 9999px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: left 0.25s ease, width 0.25s ease;
    pointer-events: none;
}
</style>
