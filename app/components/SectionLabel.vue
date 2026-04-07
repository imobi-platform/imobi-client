<template>
    <div class="topo">
        <div class="nome">
            <div class="icone">
                <component :is="icon" class="icone-icon" size="20" />
            </div>
            <p>{{ title }}</p>
        </div>
        <div v-if="button" class="item">
            <div class="button" @click="handleButtonClick">
                <component :is="button.icon" class="button-icon" size="20" />
                <span class="button-text">{{ button.text }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChartColumn, Plus } from 'lucide-vue-next';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: Object,
        required: true,
    },
    button: {
        type: Object,
        default: null,
    },

})

function handleButtonClick() {
    if (props.button.onClick) {
        props.button.onClick()
    }
}
</script>

<style scoped>
.topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
}

.topo .nome {
    align-items: center;
    display: flex;
}

.topo .nome .icone {
    align-items: center;
    background-color: #f4f7fa;
    border-radius: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 0 15px 0 0;
    width: 50px;
}

.topo .nome p {
    font-size: 0.875rem;
    font-weight: 600;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.item .button {
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

.item .button:hover {
    background-color: var(--cor-preto);
}

.item .button .button-icon {
    color: #fff;
}

.item .button .button-text {
    color: #fff;
    font-size: 0.875rem;
    font-weight: 300;
}
</style>