<template>
    <div>preenche creci, cpf, etc..</div>
    <div class="flex h-screen items-center justify-center">
        <div class="flex flex-col gap-4">
            <button @click="console.log('teste')">voltar</button>
            <div class="flex flex-col gap-1">
                <label for="nome">Nome (pree prenchido com o nome do usuario)</label>
                <input id="nome" type="text" placeholder="nome completo" class="border" v-model="corretor.nome">
            </div>
            <div class="flex flex-col gap-1">
                <label for="tipo">Tipo de pessoa (vai preencher automaticamente, nem mostra aq)</label>
                <select id="tipo" class="border" v-model="corretor.tipo">
                    <option value="fisica">Física</option>
                    <option value="juridica">Jurídica</option>
                </select>
            </div>
            <div v-if="corretor.tipo === 'fisica'" class="flex flex-col gap-1">
                <label for="cpf">CPF</label>
                <input id="cpf" type="text" placeholder="cpf" class="border" v-model="corretor.cpf">
            </div>
            <div v-else class="flex flex-col gap-1">
                <label for="cnpj">CNPJ</label>
                <input id="cnpj" type="text" placeholder="cnpj" class="border" v-model="corretor.cnpj">
            </div>
            <div class="flex flex-col gap-1">
                <label for="creci">CRECI NUMERO</label>
                <input id="creci" type="text" placeholder="creci numero" class="border" v-model="corretor.creci_numero">
            </div>
            <div class="flex flex-col gap-1">
                <label for="creci">CRECI UF</label>
                <input id="creci" type="text" placeholder="creci uf" class="border" v-model="corretor.creci_uf">
            </div>
            <div class="flex flex-col gap-1">
                <label for="creci">CRECI TIPO</label>
                <select id="creci" class="border" v-model="corretor.creci_tipo">
                    <option value="F">Física</option>
                    <option value="J">Jurídica</option>
                </select>
            </div>
            <button class="bg-orange-500 text-white px-4 py-2" @click="handleSave">Começar a anunciar!</button>
        </div>
    </div>
</template>

<script setup>
import { useOnboarding } from '@/composables/onboarding/useOnboarding'

const { user } = useAuth()
const { salvarCorretor } = useOnboarding()

const corretor = ref({
    nome: user.value?.name ?? null,
    cpf: '10534595995',
    cnpj: '',
    creci: '',
    tipo: 'fisica',
    creci_numero: 12345,
    creci_uf: 'SC',
    creci_tipo: 'F',
})

const handleSave = async () => {
    await salvarCorretor(corretor.value)
}
</script>