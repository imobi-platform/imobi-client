<template>
    <div class="empty-data">
        <DotLottieVue style="height: 150px; width: 150px" autoplay loop
            src="https://lottie.host/94a16bad-6191-4250-b5d7-7b6baa441cfc/EljQHuRoQs.lottie" />
        <div class="empty-data-info">
            <p class="empty-data-text">{{ text }}</p>
            <button class="empty-data-button">Novo Imóvel</button>
        </div>
    </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const props = defineProps({
    text: {
        type: String,
        default: 'Nenhum dado encontrado',
    },
})

</script>

<style>
.empty-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.empty-data-info {
    transform: translateY(-30px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.empty-data-text {
    font-size: 0.875rem;
    font-weight: 300;
    color: #6b7280;
}

.empty-data-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f4f6;
    height: 80px;
    width: 80px;
    border-radius: 9999px;
}

.empty-data-item-icon {
    width: 40px;
    height: 40px;
    color: #6b7280;
}

.empty-data-button {
    cursor: pointer;
    background-color: var(--cor-laranja);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 300;
    border: none;
}
</style>