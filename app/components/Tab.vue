<template>
    <button
        ref="btnRef"
        type="button"
        class="tab"
        :class="{ 'tab--active': ctx?.activeTabId === id }"
        @click="ctx?.setActiveTab(id)"
    >
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    id: { type: [String, Number], required: true },
})

const ctx = inject('tabs')
const btnRef = ref(null)

onMounted(() => {
    ctx?.registerTab(props.id, btnRef.value)
})
onBeforeUnmount(() => {
    ctx?.unregisterTab(props.id)
})
</script>

<style scoped>
.tab {
    position: relative;
    z-index: 1;
    padding: 0.35rem 1rem;
    border: none;
    background: transparent;
    border-radius: 9999px;
    font-family: "Figtree", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.2s ease;
    white-space: nowrap;
}

.tab:hover {
    color: #111;
}

.tab--active {
    color: #111;
}
</style>
