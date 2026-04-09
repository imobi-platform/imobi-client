<template>
    <div class="flex h-screen items-center justify-center">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <label for="nome">Nome (pree prenchido com o nome do usuario)</label>
                <input id="nome" type="text" placeholder="nome completo" class="border" v-model="anunciante.nome">
            </div>
            <div class="flex flex-col gap-1">
                <label for="cpf">CPF</label>
                <input id="cpf" type="text" placeholder="cpf" class="border" v-model="anunciante.cpf">
            </div>
            <div class="flex flex-col gap-1">
                <label for="tipo">Tipo de pessoa (vai preencher automaticamente, nem mostra aq)</label>
                <select id="tipo" class="border" v-model="anunciante.tipo">
                    <option value="fisica">Física</option>
                </select>
            </div>
            <button class="bg-orange-500 text-white px-4 py-2" @click="handleSave">Começar a anunciar!</button>
        </div>
    </div>
</template>

<script setup>
import { useOnboarding } from '@/composables/onboarding/useOnboarding'

const { user } = useAuth()
const { salvarAnunciante } = useOnboarding()

const anunciante = ref({
    nome: user.value?.name ?? null,
    cpf: null,
    tipo: 'fisica',
})

async function handleSave() {
    try {
        await salvarAnunciante(anunciante.value)
        navigateTo('/app')
    } catch (error) {
        console.error(error)
    }
    
}

</script>