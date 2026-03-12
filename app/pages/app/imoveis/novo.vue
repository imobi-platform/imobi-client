<template>
    <div class="imoveis-novo-page">
        <SectionLabel title="Novo Imóvel" :icon="DoorOpen" :button="{ icon: Save, text: 'Salvar', onClick: save }" />
        <Tabs v-model="activeTab">
            <Tab id="dados">Dados básicos</Tab>
            <Tab id="localizacao">Localização</Tab>
        </Tabs>
        <form>
            <div v-show="activeTab === 'dados'" class="grid grid-cols-12 gap-4">
                <InputNome v-model="imovel.nome" class="col-span-12 md:col-span-4" label="Nome do Imóvel"
                    placeholder="Digite o nome do imóvel" autocomplete="off" required />
                <Select v-model="imovel.tipo" class="col-span-12 md:col-span-4" label="Tipo"
                    :options="['Casa', 'Apartamento', 'Terreno', 'Comercial']" required />
                <Select v-model="imovel.finalidade" class="col-span-12 md:col-span-4" label="Finalidade"
                    :options="['Venda']" required />
                <InputPreco v-model="imovel.preco" class="col-span-12 md:col-span-4" label="Preço"
                    placeholder="Digite o preço do imóvel" autocomplete="off" required />
            </div>
            <div v-show="activeTab === 'localizacao'" class="grid grid-cols-12 gap-4">
                <p class="col-span-12 text-placeholder">Conteúdo da aba localização (em breve).</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { DoorOpen, Save } from 'lucide-vue-next'
import SectionLabel from '@/components/SectionLabel.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import InputNome from '~/components/InputNome.vue'
import Select from '~/components/Select.vue'
import InputPreco from '~/components/InputPreco.vue'

definePageMeta({ layout: 'painel' })

const activeTab = ref('dados')

const imovel = ref({
    nome: '',
    tipo: null,
    finalidade: null,
    preco: null,
})

const save = () => {
    console.log(imovel.value)
}
</script>

<style scoped>
.text-placeholder {
    color: #9ca3af;
    font-size: 0.875rem;
}
</style>