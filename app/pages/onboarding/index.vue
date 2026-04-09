<template>
    <div class="flex h-screen w-full items-center justify-center">
        <div class="flex gap-4">
            <div class="flex items-center justify-center h-32 bg-orange-500 p-4 text-white cursor-pointer" @click="handleSelectRole('anunciante')">quero anunciar meu imovel</div>
            <div class="flex items-center justify-center h-32 bg-orange-500 p-4 text-white cursor-pointer" @click="handleSelectRole('corretor')">sou corretor</div>
            <div class="flex items-center justify-center h-32 bg-orange-500 p-4 text-white cursor-pointer" @click="handleSelectRole('imobiliaria')">sou imobiliaria</div>
        </div>
    </div>
</template>

<script setup>
import { useOnboarding } from '@/composables/onboarding/useOnboarding'

const { salvarPapel } = useOnboarding()
async function handleSelectRole(role) {
    if (role === 'anunciante') {
        await salvarPapel('anunciante')
        navigateTo('/onboarding/anunciante')
    } else if (role === 'corretor') {
        await salvarPapel('corretor')
        navigateTo('/onboarding/corretor')
    } else if (role === 'imobiliaria') {
        await salvarPapel('imobiliaria')
        navigateTo('/onboarding/imobiliaria')
    }
}
</script>