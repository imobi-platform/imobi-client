<template>
    <div class="campo">
        <label for="textarea">{{ label }} <span v-if="required">*</span></label>
        <textarea :value="modelValue" @input="onInput" class="textarea" :rows="rows" placeholder="Digite a descrição do imóvel" :maxlength="maxlength"></textarea>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        required: true,
    },
    rows: {
        type: Number,
        default: 10,
    },
    maxlength: {
        type: Number,
        default: 1000,
    },
    modelValue: {
        type: String,
        required: true,
    },
})

function onInput(e) {
    emit('update:modelValue', e.target.value)
}

const emit = defineEmits(['update:modelValue'])

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
    font-weight: 600;
    font-size: 0.875rem;
    pointer-events: none;
}

.textarea {
    width: 100%;
    min-height: 0;
    padding: 14px 25px;
    border: 1px solid #d1d5db;
    border-radius: 1.5rem;
    font-family: "Figtree", sans-serif;
    font-weight: 300;
    font-size: 1rem;
    background: #fff;
    resize: vertical;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.textarea::-webkit-scrollbar {
    display: none;
}

.textarea:focus {
    border-color: var(--cor-preto);
    outline: none;
}

.campo textarea::placeholder {
    color: #9ca3af;
}

.campo label span {
    color: red;
}

</style>