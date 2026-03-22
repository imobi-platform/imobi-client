<template>
    <div class="imoveis-novo-page">
        <SectionLabel title="Novo Imóvel" :icon="DoorOpen" :button="{ icon: Save, text: 'Salvar', onClick: save }" />
        <Tabs v-model="activeTab">
            <Tab id="dados">Dados básicos</Tab>
            <Tab id="localizacao">Localização</Tab>
        </Tabs>
        <form>
            <div v-show="activeTab === 'dados'" class="grid grid-cols-12 gap-4">
                <InputNome v-model="imovel.nome" class="col-span-12 md:col-span-6" label="Título do anúncio"
                    placeholder="Digite o nome do imóvel" autocomplete="off" required />
                <Select v-model="imovel.tipo" class="col-span-12 md:col-span-6" label="Tipo"
                    :options="['Casa', 'Apartamento', 'Terreno', 'Comercial']" required />
                <InputPreco v-model="imovel.preco" class="col-span-12 md:col-span-6" label="Preço"
                    placeholder="Digite o preço do imóvel" autocomplete="off" required />
                <Select v-model="imovel.finalidade" class="col-span-12 md:col-span-6" label="Finalidade"
                    :options="['Venda']" required />
                <Textarea v-model="imovel.descricao" required rows="4" label="Descrição"
                    class="col-span-12 md:col-span-12" />
            </div>
            <div v-show="activeTab === 'localizacao'" class="grid grid-cols-12 gap-4">
                <InputCep v-model="imovel.cep" class="col-span-12 md:col-span-6" label="CEP" placeholder="Digite o CEP" autocomplete="off" required />
                <SelectEstado v-model="imovel.estado" class="col-span-12 md:col-span-6" label="Estado" required />
                <SelectCidade v-model="imovel.cidade" :estado="imovel.estado" class="col-span-12 md:col-span-6" label="Cidade" required />
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
import SelectEstado from '@/components/SelectEstado.vue'
import SelectCidade from '@/components/SelectCidade.vue'

definePageMeta({ layout: 'painel' })

const activeTab = ref('localizacao')

const imovel = ref({
    nome: '',
    tipo: null,
    finalidade: null,
    preco: null,
    descricao: '',
    cep: '',
    estado: '',
    cidade: null,
})

const save = async () => {
    try {
        const response = await $fetch('/api/imoveis', {
            method: 'POST',
            body: imovel.value
        })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
</script>

<style scoped>
.text-placeholder {
    color: #9ca3af;
    font-size: 0.875rem;
}
</style>