<template>
    <div ref="campoRef" class="campo" :class="{ ativo: isOpen }">
        <label>{{ label }} <span v-if="required">*</span></label>
        <div class="input" @click="toggle">
            <p class="preenchido">{{ seletedLabel }}</p>
            <svg class="setinha" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M46.7878 72.7409L4.67209 34.3679C3.03912 32.8801 3.03912 30.4678 4.67209 28.98C6.30505 27.4921 8.95262 27.4921 10.5856 28.98L52.7013 67.3529C54.3343 68.8408 54.3342 71.2531 52.7013 72.7409C51.0683 74.2288 48.4207 74.2288 46.7878 72.7409Z" />
                <path
                    d="M47.9276 68.39L90.0432 30.017C91.6762 28.5291 94.3238 28.5291 95.9568 30.017C97.5897 31.5048 97.5897 33.9171 95.9568 35.405L53.8411 73.778C52.2081 75.2658 49.5605 75.2658 47.9276 73.778C46.2946 72.2901 46.2946 69.8778 47.9276 68.39Z" />
            </svg>
        </div>
        <div class="lista">
            <div class="conteudo">
                <button v-for="option in options" :key="option" type="button" :class="{ ativo: modelValue === option }" @click="select(option)">{{ option }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(false);
const emit = defineEmits(['update:modelValue']);

const toggle = () => {
    isOpen.value = !isOpen.value;
};

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    }
});

function select(option) {
    emit('update:modelValue', option);
    isOpen.value = false;
}

const seletedLabel = computed(() => {
    return props.modelValue ||'Selecione uma opção';
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

.campo label span {
    color: red;
}

.input {
    width: 100%;
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

.lista {
    position: absolute;
    left: 0;
    top: 60px;
    background: #fff;
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 20px;
    padding: 5px;
    
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;
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
   border-radius: 14px
}

.conteudo button.ativo {
    color: #2563eb;
    font-weight: 300;
}

.conteudo button:hover {
    background: #f3f4f6;
}
</style>