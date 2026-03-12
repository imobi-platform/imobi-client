<template>
    <div class="button" :class="class" @click="onClick">
                <component :is="icon" class="button-icon" size="20" />
                <span class="button-text">{{ text }}</span>
            </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: Object,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    onClick: {
        type: Function,
        required: true,
    },
    class: {
        type: String,
        required: false,
    },
})
</script>

<style scoped>
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: var(--cor-laranja);
    border-radius: 50px;
    cursor: pointer;
    height: 50px;
    width: auto;
    padding: 0 20px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: var(--cor-preto);
}

.button-icon {
    color: #fff;
}

.button-text {
    color: #fff;
}
</style>