<template>
    <div class="campo">
        <label for="nome">{{ label }}</label>
        <input id="nome" type="text" :placeholder="placeholder" :autocomplete="autocomplete">
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    placeholder: string;
    autocomplete: string;
}>();
</script>

<style scoped>
.campo {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
}

.campo label {
    position: absolute;
    left: 16px;
    top: -7px;
    padding: 0 10px;
    background-color: #fff;
    color: #000;
    font-family: "Figtree", sans-serif;
    font-weight: 700;
    font-size: 0.875rem;
    pointer-events: none;
}

.campo input {
    width: 100%;
    padding: 14px 25px;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    font-family: "Figtree", sans-serif;
    font-size: 1rem;
    background: #fff;
    outline: none;
}

.campo input:focus {
    border-color: #000;
}

.campo input::placeholder {
    color: #9ca3af;
}
</style>