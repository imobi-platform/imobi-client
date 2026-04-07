<template>
    <div class="imoveis-novo-page">
        <SectionLabel title="Novo Imóvel" :icon="DoorOpen" :button="{ icon: Save, text: 'Salvar', onClick: save }" />
        <Tabs v-model="activeTab">
            <Tab id="dados">Dados básicos</Tab>
            <Tab id="localizacao">Localização</Tab>
        </Tabs>
        <form>
            <div v-show="activeTab === 'dados'" class="flex flex-col gap-12">
                <div class="grid grid-cols-12 gap-6">
                    <InputNome v-model="imovel.titulo" class="col-span-12 md:col-span-6" label="Título do anúncio"
                        placeholder="Digite o nome do imóvel" autocomplete="off" required />
                    <Select v-model="imovel.tipo" class="col-span-12 md:col-span-6" label="Tipo" :options="tiposImovel"
                        required />
                    <InputPreco v-model="imovel.valor" class="col-span-12 md:col-span-6" label="Preço"
                        placeholder="Digite o preço do imóvel" autocomplete="off" required />
                    <Select v-model="imovel.finalidade" class="col-span-12 md:col-span-6" label="Finalidade"
                        :options="finalidades" required />
                    <Textarea v-model="imovel.descricao" required rows="4" label="Descrição"
                        class="col-span-12 md:col-span-12" />
                </div>

                <hr />

                <div class="grid grid-cols-12 gap-6">
                    <SelectEstado v-model="imovel.uf" class="col-span-12 md:col-span-6" label="Estado" required />
                    <SelectCidade v-model="imovel.municipio" :estado="imovel.estado" class="col-span-12 md:col-span-6"
                        label="Cidade" required />
                    <SelectEstado v-model="imovel.bairro" class="col-span-12 md:col-span-6"
                        label="Bairro (mudar depois)" required />
                    <InputCep v-model="imovel.cep" class="col-span-12 md:col-span-6" label="CEP"
                        placeholder="Digite o CEP" autocomplete="off" required />
                    <InputEndereco v-model="imovel.logradouro" class="col-span-12 md:col-span-10"
                        label="Logradouro (Rua/Avenida)" autocomplete="off" required />
                    <InputNumeroEndereco v-model="imovel.numero" class="col-span-12 md:col-span-2" label="Número"
                        autocomplete="off" required />
                </div>
            </div>
            <div v-show="activeTab === 'localizacao'" class="grid grid-cols-12 gap-4">

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
import InputCep from '@/components/InputCep.vue'
import InputEndereco from '@/components/InputEndereco.vue'
import InputNumeroEndereco from '@/components/InputNumeroEndereco.vue'
import { useImovel } from '@/composables/imoveis/useImovel'

definePageMeta({ layout: 'painel' })

const activeTab = ref('dados')

const { criar } = useImovel()

const imovel = ref({
    titulo: '',
    tipo: null,
    finalidade: null,
    logradouro: '',
    numero: '',
    valor: null,
    descricao: '',
    // cep: '',
    uf: '',
    municipio: null,
})

/**
 * Tipos de imóvel (TODO:: Mandar pro backend depois)
 */
const tiposImovel = [
    { value: 'CASA', label: 'Casa' },
    { value: 'APARTAMENTO', label: 'Apartamento' },
    { value: 'TERRENO', label: 'Terreno' },
    { value: 'COMERCIAL', label: 'Comercial' },
]

/**
 * Finalidades (TODO:: Mandar pro backend depois)
 */
const finalidades = [
    { value: 'VENDA', label: 'Venda' },
    { value: 'ALUGUEL', label: 'Aluguel' },
]

const save = async () => {
    try {
        const response = await criar(imovel.value)
        navigateTo('/app/imoveis')
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