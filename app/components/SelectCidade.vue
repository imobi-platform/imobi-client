<template>
    <div ref="campoRef" class="campo" :class="{ ativo: isOpen, 'campo--disabled': !estado }">
        <label>{{ label }} <span v-if="required">*</span></label>
        <button
            type="button"
            class="input"
            :disabled="!estado"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
            @click="toggle"
        >
            <p class="preenchido">{{ selectedLabel }}</p>
            <svg class="setinha" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M46.7878 72.7409L4.67209 34.3679C3.03912 32.8801 3.03912 30.4678 4.67209 28.98C6.30505 27.4921 8.95262 27.4921 10.5856 28.98L52.7013 67.3529C54.3343 68.8408 54.3342 71.2531 52.7013 72.7409C51.0683 74.2288 48.4207 74.2288 46.7878 72.7409Z" />
                <path
                    d="M47.9276 68.39L90.0432 30.017C91.6762 28.5291 94.3238 28.5291 95.9568 30.017C97.5897 31.5048 97.5897 33.9171 95.9568 35.405L53.8411 73.778C52.2081 75.2658 49.5605 75.2658 47.9276 73.778C46.2946 72.2901 46.2946 69.8778 47.9276 68.39Z" />
            </svg>
        </button>
        <div class="lista">
            <div v-if="!loading && cidades.length > 0" class="lista-busca" @click.stop>
                <Search class="lista-busca-icon" />
                <input
                    v-model="buscaQuery"
                    type="text"
                    class="lista-busca-input"
                    placeholder="Buscar..."
                    aria-label="Filtrar cidades"
                    @click.stop
                />
            </div>
            <div class="conteudo">
                <template v-if="loading">
                    <p class="conteudo-loading">Carregando cidades...</p>
                </template>
                <template v-else>
                    <button
                        v-for="opt in cidadesFiltradas"
                        :key="opt.value"
                        type="button"
                        :class="{ ativo: modelValue == opt.value }"
                        @click="select(opt.value)"
                    >
                        {{ opt.label }}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

const props = defineProps({
    /** Sigla do estado (UF) selecionado. Quando vazio, o campo fica desabilitado. */
    estado: { type: String, default: '' },
    /** ID do município (IBGE) ou nome, conforme options. */
    modelValue: { default: null },
    label: { type: String, default: 'Cidade' },
    required: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const campoRef = ref(null)
const isOpen = ref(false)
const buscaQuery = ref('')

/** Municípios do estado (IBGE): value = id, label = nome. Ordenados por nome. */
const cidades = ref([])
const loading = ref(false)

function close() {
    isOpen.value = false
    buscaQuery.value = ''
    if (import.meta.client) document.removeEventListener('click', onDocumentClick)
}

const cidadesFiltradas = computed(() => {
    const q = buscaQuery.value.trim().toLowerCase()
    if (!q) return cidades.value
    return cidades.value.filter((opt) =>
        opt.label.toLowerCase().includes(q)
    )
})

function onDocumentClick(e) {
    if (campoRef.value && !campoRef.value.contains(e.target)) close()
}

function toggle() {
    if (!props.estado) return
    if (isOpen.value) {
        close()
        return
    }
    isOpen.value = true
    if (import.meta.client) setTimeout(() => document.addEventListener('click', onDocumentClick), 0)
}

async function fetchCidades() {
    if (!props.estado) {
        cidades.value = []
        return
    }
    loading.value = true
    try {
        const uf = encodeURIComponent(props.estado)
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        const data = await response.json()
        const sorted = [...data].sort((a, b) => a.nome.localeCompare(b.nome))
        cidades.value = sorted.map((item) => ({ value: item.id, label: item.nome }))
    } catch {
        cidades.value = []
    } finally {
        loading.value = false
    }
}

function select(value) {
    emit('update:modelValue', value)
    close()
}

watch(() => props.estado, (novo, antigo) => {
    fetchCidades()
    if (antigo !== undefined && novo !== antigo) emit('update:modelValue', null)
}, { immediate: true })

onBeforeUnmount(close)

const selectedLabel = computed(() => {
    if (!props.estado) return 'Selecione o estado primeiro'
    const v = props.modelValue
    if (v === '' || v == null) return 'Selecione uma cidade'
    const opt = cidades.value.find((o) => o.value == v)
    return opt ? opt.label : 'Selecione uma cidade'
})
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

.campo label span {
    color: red;
}

.input {
    width: 100%;
    margin: 0;
    padding: 14px 25px;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    font-family: "Figtree", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    appearance: none;
    -webkit-appearance: none;
    text-align: left;
    outline: none;
}

.input:focus {
    border-color: var(--cor-preto);
}

.input:disabled {
    cursor: not-allowed;
    background: #fff;
}

.campo--disabled .preenchido {
    color: var(--cor-preto);
}

.preenchido {
    margin: 0;
    color: #000;
}

.setinha {
    width: 14px;
    height: 14px;
    color: #6b7280;
    flex-shrink: 0;
    transition: 0.3s;
}

.input:disabled .setinha {
    color: #9ca3af;
}

.lista {
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 50;
    background: #fff;
    width: 100%;
    max-height: 320px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #d1d5db;
    border-radius: 20px;
    padding: 5px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;
}

.lista-busca {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 6px 10px;
    margin-bottom: 4px;
    background: #f3f4f6;
    border-radius: 16px;
}

.lista-busca-icon {
    width: 16px;
    height: 16px;
    color: #6b7280;
    flex-shrink: 0;
}

.lista-busca-input {
    flex: 1;
    min-width: 0;
    padding: 6px 0;
    border: none;
    background: transparent;
    font-family: "Figtree", sans-serif;
    font-size: 0.875rem;
    outline: none;
}

.lista-busca-input::placeholder {
    color: #9ca3af;
}

.campo.ativo .lista {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.campo.ativo .input {
    border-color: var(--cor-preto);
}

.campo.ativo .setinha {
    transform: rotate(180deg);
    color: #2563eb;
}

.conteudo {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    max-height: 260px;
}

.conteudo-loading {
    padding: 10px 25px;
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
}

.conteudo button {
    font-weight: 300;
    background: none;
    border: none;
    padding: 10px 25px;
    text-align: left;
    font-family: "Figtree", sans-serif;
    font-size: 1rem;
    color: #6b7280;
    cursor: pointer;
    border-radius: 14px;
}

.conteudo button.ativo {
    color: var(--cor-laranja);
    font-weight: 300;
}

.conteudo button:hover {
    background: #f3f4f6;
}

.conteudo button:focus {
    outline: 2px solid var(--cor-preto);
    outline-offset: 2px;
}
</style>
