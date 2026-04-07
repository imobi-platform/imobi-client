<template>
    <div class="campo">
        <label for="endereco">{{ label }} <span v-if="required">*</span></label>
        <input id="endereco" type="text" :placeholder="placeholder" :autocomplete="autocomplete" :required="required" v-model="inputValue">
    </div>
</template>

<script setup>

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Rua Manoel João Machado, 780'
    },
    autocomplete: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        required: true
    }
});
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

.campo input {
    width: 100%;
    padding: 14px 25px;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    font-family: "Figtree", sans-serif;
    font-weight: 300;
    font-size: 1rem;
    background: #fff;
    outline: none;
}

.campo input:focus {
    border-color: var(--cor-preto);
}

.campo input::placeholder {
    color: #9ca3af;
}

.campo label span {
    color: red;
}
</style>