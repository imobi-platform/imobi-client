<template>
    <div class="campo">
        <label :for="inputId">{{ label }} <span v-if="required">*</span></label>
        <div class="input-wrap">
            <span class="prefix">R$</span>
            <input
                :id="inputId"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                :placeholder="placeholder"
                :required="required"
                :value="displayValue"
                @input="onInput"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: { type: String, required: true },
    placeholder: { type: String, default: '0,00' },
    modelValue: { type: [Number, String], default: null },
    required: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const inputId = `input-preco-${Math.random().toString(36).slice(2, 9)}`

/** Dígitos digitados (valor em centavos). */
const digits = ref('')

watch(
    () => props.modelValue,
    (val) => {
        const n = Number(val)
        if (Number.isFinite(n) && n >= 0) digits.value = String(Math.round(n * 100))
        else if (val == null || val === '') digits.value = ''
    },
    { immediate: true }
)

function formatBr(value) {
    const n = Number(value)
    if (!Number.isFinite(n) || n < 0) return '0,00'
    return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const displayValue = computed(() => {
    if (!digits.value) return ''
    const cents = parseInt(digits.value, 10) || 0
    return formatBr(cents / 100)
})

function onInput(e) {
    const raw = (e.target.value || '').replace(/\D/g, '')
    digits.value = raw.slice(0, 15)
    const cents = parseInt(digits.value, 10) || 0
    emit('update:modelValue', cents / 100)
}
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

.input-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    background: #fff;
    overflow: hidden;
    padding-left: 0.5rem;
}

.input-wrap:focus-within {
    border-color: var(--cor-preto);
}

.prefix {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f3f4f6;
    color: #000;
    font-family: "Figtree", sans-serif;
    font-size: 0.75rem;
    font-weight: 300;
    z-index: 1;
}

.campo input {
    flex: 1;
    min-width: 0;
    padding: 14px 25px 14px 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: "Figtree", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: #000;
}

.campo input::placeholder {
    color: #9ca3af;
}

.campo label span {
    color: red;
}
</style>